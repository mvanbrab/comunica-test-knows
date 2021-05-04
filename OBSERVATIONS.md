# Observations

Most observations can be verified in index.log commited on corresponding date.

## 2021-05-04
- (1) Calling v8.writeHeapSnapshot() after first query, results in premature node exit, even without error message. Last lines of (verbose) logging output:
  ```
  info: Memory usage after handling query 1/48: 
        rss 255.07 MB
        heapTotal 135.85 MB
        heapUsed 108.06 MB
        external 1.9 MB
        arrayBuffers 0.46 MB
  info: Started writing heap snapshot to file heap-1.heapsnapshot
  ```
- (2) Confirmation of all observations of 2021-04-29, even when adding `NODE_ENV=production` in front of the node command line.
  It is very remarkable that exactly the same queries have excessive execution times (> 230 seconds).
- (3) Differences in output data for 2 master theses: `contactPoint` concerning `https://ben.de-meester.org/#me` (compared with previously committed index.log)

## 2021-05-03
- (1) First commit today: remarkable difference with observations (2) and (3) of 2021-04-29:
  - Suddenly total duration now 167 seconds, no excessive individual query execution times!
- (2) Second commit today: observations (2) and (3) again in line with those of 2021-04-29.
  - Due to behaviour of datasources??? or network???

## 2021-04-29
- (1) Big memory usage (up to 1600 MB)
- (2) Runs slow (over 2000 seconds to fetch all KNoWS data)
  - Mind the individual query execution times. Following ones have excessive execution times (> 230 seconds), compared to others (a few seconds):
    5/48, 10/48, 15/48, 20/48, 25/48, 30/48, 35/48, 46/48
- (3) It takes about 4 minutes between final log message ("Ending app...") and node application exit
