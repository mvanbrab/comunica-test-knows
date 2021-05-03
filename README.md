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
node ./index.js --log verbose 2>&1 | tee index.log 
```

## Observations

See [here](OBSERVATIONS.md)
