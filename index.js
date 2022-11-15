/**
 * Executing GraphQL-LD queries as in the KNoWS site, but now outside Walder.
 */

const Client = require("graphql-ld").Client;
const QueryEngineComunica = require("graphql-ld-comunica").QueryEngineComunica;
const LoggerPretty = require("@comunica/logger-pretty").LoggerPretty;
const commander = require("commander");
const createLogger = require("./create-logger");
const knowsQueryData = require("./knows-query-data");
const assert = require("assert");

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
 * @param lenient Comunica lenient option
 * @param query GraphQL-LD query
 * @param context JSON-LD context for the query
 * @param sources sources to visit
 * @param sequenceIndicator string indicating the current sequence
 * @param loggers the loggers
 * @returns {Promise<void>} the Comunica result
 */
async function doComunicaQuery(lenient, query, context, sources, sequenceIndicator, loggers) {
  loggers.app.verbose(`Query: ${query}`);
  loggers.app.verbose(`Context: ${JSON.stringify(context, null, 2)}`);
  loggers.app.verbose(`Sources: ${JSON.stringify(sources, null, 2)}`);

  loggers.app.info(`Starting query ${sequenceIndicator}`);
  const t0 = process.hrtime();
  const comunicaConfig = {
    sources,
    lenient: lenient
  };
  if (loggers.hasOwnProperty("comunica")) {
    comunicaConfig.log = loggers.comunica;
  }
  const queryEngine = new QueryEngineComunica(comunicaConfig);
  const client = new Client({context, queryEngine});
  let result = {};
  try {
    result = await client.query({query});
    await queryEngine.comunicaEngine.invalidateHttpCache();
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
 * @param lenient Comunica lenient option
 * @param queryDataItem item from array knowsQueryData
 * @param sequenceIndicator string indicating the current sequence
 * @param loggers the loggers
 * @returns {Promise<void>}
 */
async function processOneQueryDataItem(lenient, queryDataItem, sequenceIndicator, loggers) {
  const query = getExpandedQuery(queryDataItem);
  const context = JSON.parse(queryDataItem.context);
  const sources = queryDataItem.sources;
  const result = await doComunicaQuery(lenient, query, context, sources, sequenceIndicator, loggers);
  return result;
}

/**
 * parser for commander
 * @param value
 * @param dummyPrevious
 * @returns {number}
 */
function parseCommandlineArgumentPositiveInt(value, dummyPrevious) {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new commander.InvalidOptionArgumentError('Not a number.');
  }
  if (parsedValue < 0) {
    throw new commander.InvalidOptionArgumentError('Less than 0.');
  }
  return parsedValue;
}

/**
 * parser for commander
 * @param value
 * @param previous
 * @returns {number[]|*}
 */
function parseCommandlineArgumentQueryNumbers(value, previous) {
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    throw new commander.InvalidOptionArgumentError('Not a number.');
  }
  if (parsedValue < 1) {
    throw new commander.InvalidOptionArgumentError('Less than 1.');
  }
  if (parsedValue > knowsQueryData.length) {
    throw new commander.InvalidOptionArgumentError(`Greater than limit ${knowsQueryData.length}.`);
  }
  if (Array.isArray(previous)) {
    return previous.concat([parsedValue]);
  } else {
    return [parsedValue];
  }
}


/**
 * Start
 */
(async function main() {
  const program= new commander.Command();
  program
    .addOption(new commander.Option("--no-lenient", "Do not set Comunica option lenient to true"))
    .addOption(new commander.Option("--query <queries...>", "Queries to test (1-based indices in the array of test queries, default: all queries").argParser(parseCommandlineArgumentQueryNumbers))
    .addOption(new commander.Option("--repeat <nr_repeats>", "Repeat each query this number of times or until the result differs").default(0).argParser(parseCommandlineArgumentPositiveInt))
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

  let queryIndicesBase1;
  if (options.query) {
    queryIndicesBase1 = options.query;
  } else {
    queryIndicesBase1 = [];
    for (let i = 1 ; i < knowsQueryData.length + 1 ; i++) {
      queryIndicesBase1.push(i);
    }
  }

  loggers.app.info(`Starting app with parameters:\n${JSON.stringify(options, null, 2)}`);
  logMemoryUsage(`Memory usage before handling queries`, loggers);
  const t0 = process.hrtime();
  try {
    for (let i of queryIndicesBase1) {
      let refResult, refResultJson;
      for (let j = 0; j < options.repeat + 1; j++) {
        const result = await processOneQueryDataItem(options.lenient, knowsQueryData[i - 1], `${i}/${knowsQueryData.length}, repetition ${j}/${options.repeat}`, loggers);
        if (j == 0) {
          refResult = result;
          refResultJson = JSON.stringify(refResult);
          // HACK: we won't compare results if a blank node is involved (appear if id involved not starting with "http")
          if (refResultJson.match(/"id":\s*"[^h][^t][^t][^p]/)) {
            loggers.app.verbose(`Not comparing query ${i} because blank node involved`);
            break;
          }
        } else {
          try {
            assert.deepStrictEqual(result, refResult, `Oops:  comparison ${j} failed on query ${i}:\n${JSON.stringify(result)}\nis not equal to\n${refResultJson}`);
          } catch (e) {
            loggers.app.error(e.message);
            break;
          }
        }
      }
    }
  } finally {
    const dt = process.hrtime(t0);
    loggers.app.info(`Ending app (duration: ${dt[0]}.${dt[1]} s)`);
  }
})();
