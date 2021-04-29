/**
 * Executing GraphQL-LD queries as in the KNoWS site, but now outside Walder.
 */

const Client = require("graphql-ld").Client;
const QueryEngineComunica = require("graphql-ld-comunica").QueryEngineComunica;
const LoggerPretty = require("@comunica/logger-pretty").LoggerPretty;
const commander = require("commander");
const createLogger = require('./create-logger');
const knowsQueryData = require("./knows-query-data");

/**
 * Do one Comunica query
 *
 * @param queryDataItem item from array knowsQueryData
 * @param completionIndicator string identifying this query
 * @param loggers the loggers
 * @returns {Promise<ExecutionResult<{[p: string]: any}, {[p: string]: any}>>}
 */
async function doQuery(queryDataItem, completionIndicator, loggers) {
  let query = queryDataItem.query;
  if (queryDataItem.hasOwnProperty("queryParameters")) {
    for (const [param, value] of Object.entries(queryDataItem.queryParameters)) {
      query = query.split(`$${param}`).join(`"${value}"`);
    }
  }
  const context =  JSON.parse(queryDataItem.context);

  loggers.app.info(`Starting query ${completionIndicator}: ${query}`);
  const t0 = process.hrtime();
  const comunicaConfig = {
    sources: queryDataItem.sources,
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
    loggers.app.error(`Query ${completionIndicator} failed after ${dt[0]}.${dt[1]} s: ${e}`);
    throw e;
  }
  const dt = process.hrtime(t0);
  loggers.app.info(`Ending query ${completionIndicator} (duration: ${dt[0]}.${dt[1]} s)`);
  loggers.app.verbose(`Query ${completionIndicator} result:
${JSON.stringify(result, null, 2)}`);

  return result;
}

function printMemoryUsage(loggers) {
  const memoryUsage = process.memoryUsage();
  let message = "Memory usage so far: ";
  for (let key in memoryUsage) {
    message = `${message}
      ${key} ${Math.round(memoryUsage[key] / 1024 / 1024 * 100) / 100} MB`;
  }
  loggers.app.info(message);
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

  loggers.app.info("Starting app");
  const t0 = process.hrtime();
  printMemoryUsage(loggers);
  try {
    for (i = 0 ; i < knowsQueryData.length ; i++) {
      await doQuery(knowsQueryData[i], `${i + 1}/${knowsQueryData.length}`, loggers);
      printMemoryUsage(loggers);
    }
  }
  finally {
    const dt = process.hrtime(t0);
    loggers.app.info(`Ending app (duration: ${dt[0]}.${dt[1]} s)`);
  }
})();
