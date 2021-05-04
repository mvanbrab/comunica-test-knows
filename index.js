/**
 * Executing GraphQL-LD queries as in the KNoWS site, but now outside Walder.
 */

const Client = require("graphql-ld").Client;
const QueryEngineComunica = require("graphql-ld-comunica").QueryEngineComunica;
const LoggerPretty = require("@comunica/logger-pretty").LoggerPretty;
const commander = require("commander");
const createLogger = require("./create-logger");
const knowsQueryData = require("./knows-query-data");
const { writeHeapSnapshot } = require("v8");

/**
 * Log the momentary memory usage
 * @param title title string
 * @param loggers the loggers
 */
function logMemoryUsage(title, loggers) {
  const memoryUsage = process.memoryUsage();
  let message = `${title}: `;
  for (let key in memoryUsage) {
    message = `${message}
      ${key} ${Math.round(memoryUsage[key] / 1024 / 1024 * 100) / 100} MB`;
  }
  loggers.app.info(message);
}

/**
 * Wrapper around writeHeapSnapshot (logging before and after, 'cause I want to know if it succeeds well
 * @param filename the filename
 * @param loggers the loggers
 */
function myWriteHeapSnapshot(filename, loggers) {
  loggers.app.info(`Started writing heap snapshot to file ${filename}`);
  writeHeapSnapshot(filename);
  loggers.app.info(`Ended Writing heap snapshot to file ${filename}`);
}

/**
 * Gets the query and substitute the parameters (if any) with their values
 * @param queryDataItem item from array knowsQueryData
 * @returns {string}
 */
function getExpandedQuery(queryDataItem) {
  let query = queryDataItem.query;
  if (queryDataItem.hasOwnProperty("queryParameters")) {
    for (const [param, value] of Object.entries(queryDataItem.queryParameters)) {
      query = query.split(`$${param}`).join(`"${value}"`);
    }
  }
  return query;
}

/**
 * Let Comunica do one GraphQL-LD query (same calling sequence as in Walder + some logging
 * @param query GraphQL-LD query
 * @param context JSON-LD context for the query
 * @param sources sources to visit
 * @param sequenceIndicator string indicating the current sequence
 * @param loggers the loggers
 * @returns {Promise<void>} the Comunica result
 */
async function doComunicaQuery(query, context, sources, sequenceIndicator, loggers) {
  loggers.app.verbose(`Query: ${query}`);
  loggers.app.verbose(`Context: ${JSON.stringify(context, null, 2)}`);
  loggers.app.verbose(`Sources: ${JSON.stringify(sources, null, 2)}`);

  loggers.app.info(`Starting query ${sequenceIndicator}`);
  const t0 = process.hrtime();
  const comunicaConfig = {
    sources,
    lenient: true
  };
  if (loggers.hasOwnProperty("comunica")) {
    comunicaConfig.log = loggers.comunica;
  }
  const queryEngine = new QueryEngineComunica(comunicaConfig);
  const client = new Client({context, queryEngine});
  let result = {};
  try {
    result = await client.query({query});
    queryEngine.comunicaEngine.invalidateHttpCache();
  }
  catch (e) {
    const dt = process.hrtime(t0);
    loggers.app.error(`Query ${sequenceIndicator} failed after ${dt[0]}.${dt[1]} s: ${e}`);
    throw e;
  }
  const dt = process.hrtime(t0);
  loggers.app.info(`Ending query ${sequenceIndicator} (duration: ${dt[0]}.${dt[1]} s)`);

  loggers.app.verbose(`Query ${sequenceIndicator} result:
${JSON.stringify(result, null, 2)}`);

  logMemoryUsage(`Memory usage after handling query ${sequenceIndicator}`, loggers);

  return result;
}

/**
 * Process one query data item
 * @param queryDataItem item from array knowsQueryData
 * @param sequenceIndicator string indicating the current sequence
 * @param loggers the loggers
 * @returns {Promise<void>}
 */
async function processOneQueryDataItem(queryDataItem, sequenceIndicator, loggers) {
  const query = getExpandedQuery(queryDataItem);
  const context = JSON.parse(queryDataItem.context);
  const sources = queryDataItem.sources;
  const result = await doComunicaQuery(query, context, sources, sequenceIndicator, loggers);
  return result;
}

/**
 * Start
 */
(async function main() {
  const program= new commander.Command();
  program
    .addOption(new commander.Option("--log <level>", "App logging level (if used, recommended: info, verbose)").choices(["error", "warn", "info", "verbose", "debug", "silly"]))
    .addOption(new commander.Option("--logc <level>", "Comunica logging level (if used, recommended: debug").choices(["error", "warn", "info", "verbose", "debug", "trace"]))
    .parse(process.argv);
  const options = program.opts();

  const loggers = {
    app: createLogger(options.log)
  };
  if (options.logc) {
    loggers.comunica = new LoggerPretty({level: options.logc});
  }
  if (!options.log && !options.logc) {
    console.log("Running silently - consider logging options...")
  }

  loggers.app.info("Starting app %d", 1);
  logMemoryUsage(`Memory usage before handling queries`, loggers);
  // this one succeeds well
  // commented out anyway...
  // myWriteHeapSnapshot(`heap-0.heapsnapshot`, loggers);
  const t0 = process.hrtime();
  try {
    for (let i = 0 ; i < knowsQueryData.length ; i++) {
      await processOneQueryDataItem(knowsQueryData[i], `${i + 1}/${knowsQueryData.length}`, loggers);
      // this one fails the first time already, with a node exit without error being thrown, exit code is 0
      // it even fails if the the call to myWriteHeapSnapshot above is commented out
      // so it has nothing to do with this issue https://github.com/nodejs/node/issues/35559,
      // that is closed anyway (I observed with recent node v14.16.1)
      // commented out to avoid node exit...
      // myWriteHeapSnapshot(`heap-${i + 1}.heapsnapshot`, loggers);
    }
  }
  finally {
    const dt = process.hrtime(t0);
    loggers.app.info(`Ending app (duration: ${dt[0]}.${dt[1]} s)`);
  }
})();
