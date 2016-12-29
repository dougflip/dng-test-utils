DNG Test Utils
====================

## Overview

Reduces boiler plate in Angular test code.
Specifically regarding mocking dependencies and working with promises.

## Install

```
npm install -D dng-test-utils
```

## Setup

You need to reference the module name as part of your test setup:

```
import dngTestUtils from 'dng-test-utils';

// ...then in your top level describe block...

beforeEach(() => angular.mock.module(dngTestUtils.name));
```

## More Info

- [Sample Test File](./test/dng-test-utils_test.js) - shows actual setup and use.
- [Docs](./docs/) - more in depth reading and tips.
- [Source Code](./src)
