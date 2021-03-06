# metro-info

[![Build Status](https://img.shields.io/github/workflow/status/Codex-/metro-info/Node%20CI.svg?style=flat-square)](https://github.com/Codex-/metro-info/actions?workflow=Node+CI)
[![Code Coverage Status](https://img.shields.io/coveralls/github/Codex-/metro-info.svg?style=flat-square)](https://coveralls.io/github/Codex-/metro-info)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

> 🚌 Simplified interaction with Christchurch's Metro Info bus service

## Install

```
npm install metro-info
```

## Usage

Getting times for a specific Platform can be achieved as per the example below.

```typescript
import { getPlatformTimes, PlatformTimes } from 'metro-info';

async function getTimes(): void {
  const platformTimes: PlatformTimes = await getPlatformTimes(1205);
}
```

If you're unsure of a Platform number, they can be found on the physical stops themselves or alternatively a complete collection of all Platforms with their locations, tags, and various other information can be obtained as per the example below.

```typescript
import { getPlatformLocations, PlatformLocations } from 'metro-info';

async function getLocations(): void {
  const platformLocations: PlatformLocations = await getPlatformLocations();
}
```

## Compatibility

`metro-info` will opt to use a globally provided `fetch` method if one exists, before falling back to using `node-fetch`. This allows compatibility with with any frameworks that implement `fetch`, such as: NativeScript, React Native, and most browsers.

## Models

The models closely resemble those as exposed by the Connexionz API. The schema documentation was incredibly verbose, I have omitted commenting many items as a lot of the schema documentation simply reiterated the property name.

## Issues

If you encounter a case where an exception is thrown while parsing the XML response, please raise an issue including the XML that caused the failure and I will investigate the cause.
