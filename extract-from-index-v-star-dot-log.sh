#!/bin/bash

# extract heapUsed info from index-v*.log files into index-v*.log.heapUsed files
for f in index*.log ; do awk '/heapUsed/ {print($2, $3)}' $f > $f.heapUsed; done

# extract duration info from index-v*.log files into index-v*.log.duration files
for f in index*.log ; do awk '/Ending query.*duration:/ {print($6, "s")}' $f > $f.duration ; done