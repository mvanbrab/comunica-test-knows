# Comunica test KNoWS

A Comunica test with queries from the KNoWS site (without using Walder)

## Installation

```
yarn install
```

## Run

```
# show options
node ./index.js -h

# saving output on a Linux machine (this was done to save index.log)
# following the NODE_ENV assignment recommendation found in https://comunica.dev/docs/query/faq/
NODE_ENV=production node ./index.js --log verbose 2>&1 | tee index.log 
```

### Tools

Some Bash shell script(s) help postprocessing log files. See comments inside the .sh files.

## Observations

See [here](OBSERVATIONS.md)
