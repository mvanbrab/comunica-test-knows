# Changelog

### Added
- Loggings for different node versions
- Bash script to extract heapUsed and duration from log files
- Loggings with Comunica logging set to debug
- Logging with Comunica lenient option set to false

### Changed
- Structured code / improved logging for better diff'ing
- Added calls to v8.writeHeapSnapshot() (had to put them in comments unfortunately)

### Fixed
