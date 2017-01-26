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

The bare bones setup looks something like this:

```
import dngTestUtils from 'dng-test-utils';
import moduleToTest from './module-to-test';

// ...then in your top level describe block...

beforeEach(dngTestUtils.init(moduleToTest.name, [nullMocks], { customMocks }));
```

The [sample test file](./test/dng-test-utils_test.js) has much more detail.

## More Info

- [Docs](./docs/) - more in depth reading and tips.
- [Source Code](./src)
