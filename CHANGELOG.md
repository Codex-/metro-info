# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2019-04-26

### Added

- Docstrings expanded to note the source schema name.

### Fixed

- Docstrings were being stripped due to a bad tsconfig setting.
- Fixed a bug in Platform Times where a Trip ID would always be undefined.
- Fixed `Trip` interface as `id` and `wheelchairAccess` are optional according to the schema.

## [1.0.4] - 2019-03-26

### Added

- Added `node-fetch`.

### Removed

- Removed `@types/request-promise-native`.
- Removed `request` in favour of `fetch` to improve compatibility.
- Removed `request-promise-native`.

## [1.0.3] - 2019-03-19

### Changed

- Repository had a strange tag clash. Bumping for clean new version.

## [1.0.2] - 2019-03-19

### Added

- Coveralls support.
- Jest code coverage generation.
- Coverage npm script for travis-ci.
- Improved test coverage for alertMapper.

### Changed

- Improved order of operations with npm scripts.
- Improved travis-ci configuration.

## [1.0.1] - 2019-01-26

### Changed

- Added CHANGELOG.
- Added Jest testing.
- Added travis config.
- Fixed `types` property missing in package JSON.
- Fixed tabs instead of spaces in tslint JSON.
- Fixed shield in readme for build status.
- Fixed missing pretest step not running builds / linting / formatting before tests.

## 1.0.0 - 2019-01-22

### Added

- Initial release.
- Added support for querying platform times.
- Added support for querying platform locations.
- Added typings for all returned results.

[unreleased]: https://github.com/Codex-/metro-info/compare/v1.0.4...HEAD
[1.0.4]: https://github.com/Codex-/metro-info/compare/v1.0.3...v1.0.4
[1.0.3]: https://github.com/Codex-/metro-info/compare/v1.0.2...v1.0.3
[1.0.2]: https://github.com/Codex-/metro-info/compare/v1.0.1...v1.0.2
[1.0.1]: https://github.com/Codex-/metro-info/compare/v1.0.0...v1.0.1
