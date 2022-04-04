# metro-info

[![build](https://github.com/Codex-/metro-info/actions/workflows/build.yml/badge.svg)](https://github.com/Codex-/metro-info/actions/workflows/build.yml)
[![codecov](https://codecov.io/gh/Codex-/metro-info/branch/main/graph/badge.svg?token=WWGNIPC249)](https://codecov.io/gh/Codex-/metro-info)
[![npm](https://img.shields.io/npm/v/metro-info.svg)](https://www.npmjs.com/package/metro-info)

> 🚌 Simplified interaction with Christchurch's Metro Info bus service

## Install

```shell
npm install metro-info
```

## Usage

Getting times for a specific Platform can be achieved as per the example below.

```typescript
import { getPlatformTimes, PlatformTimes } from "metro-info";

async function getTimes(): void {
  const platformTimes: PlatformTimes = await getPlatformTimes(1205);
}
```

If you're unsure of a Platform number, they can be found on the physical stops themselves or alternatively a complete collection of all Platforms with their locations, tags, and various other information can be obtained as per the example below.

```typescript
import { getPlatformLocations, PlatformLocations } from "metro-info";

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
