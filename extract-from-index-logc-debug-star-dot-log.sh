#!/bin/bash

# extract all relevant lines to point at differences found in lengthy index-logc-debug-*.log files; results in index-logc-debug-*.log.grepped files
for f in index-logc-debug-*.log ; do grep -E 'Starting query|ERROR|"id": "https://ben\.de-meester\.org/#me"|"id": "https://hvdsomp\.info/#i"' $f > $f.grepped ; done
