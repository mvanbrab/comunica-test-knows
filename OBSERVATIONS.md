# Observations

Most observations can be verified in index.log commited on corresponding date.

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
