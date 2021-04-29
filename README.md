# Comunica test KNoWS

A Comunica test with queries from the KNoWS site (without using Walder)

## Installation

```
yarn install
```

## Run

```
# with yarn
yarn start

# show options
node ./index.js -h

# saving output on a Linux machine (this was done to save index.log)
node .index.js --log verbose 2>&1 | tee index.log 
```

## Current observations (see also index.log)

- Runs without errors, but with big memory usage (up to 1500 MB)
- Runs slow (over 2000 seconds to fetch all KNoWS data)
- Takes 4 minutes after final log message ("Ending app...") and node termination
