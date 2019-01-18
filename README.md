# metro-info

![Build Status](https://img.shields.io/appveyor/ci/codex-/metro-info.svg?style=flat-square)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

> 🚌 Simplified interaction with Christchurch's Metro Info bus service

## Install
### This will be published to npm once a stable is released
```
npm install git+https://git@github.com/codex-/metro-info.git
```

## Usage
```typescript
import * as metroInfo from 'metro-info';
```

The models closely resemble those as exposed by the Connexionz API. The schema documentation was incredibly verbose, I have omitted commenting many items as a lot of the schema documentation simply reiterated the property name.

## Issues
If you encounter a case where an exception is thrown while parsing the XML response, please raise an issue including the XML that caused the failure and I will investigate the cause.
