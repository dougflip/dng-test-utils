nullMock
==========

Makes creating spies of an existing instance quick and easy.

## What is it?

nullMock provides a way to take a regular object and use it as the basis for a
Jasmine spy. You give nullMock a real object and it returns an object with the
same methods, but they are all spies.

## Why is that Useful?

This makes it much easier to create a spy and has the added benefit that
[spies stay in sync with your implementation](./testing-patterns.md#favor-nullmocks).

## Preferred Usage

The preferred usage is to let dngTestUtils create these for you by specifying
an array of string dependency names in your `init` call.

```
const nullMocks = ['service1', 'factory1']
beforeEach(dngTestUtils.init(sampleModule.name, nullMocks, customMocks));
```

The above creates an injectable called `dngMocks` which will contain the spies.
Take a look at [the sample test file](../test/dng-test-utils_test.js)
for how this all fits together.

## Direct Usage

This is considered "legacy usage" right now as I am hoping you can always let
the `init` method handle creating these for you. However, for backwards compatibility
this style is still available:

```
import dngTestUtils from 'dng-test-utils';
import actualService from './actual-service';

beforeEach(() => {
  const spy = dngTestUtils.nullMock(actualService);
});
```

The nullMock function can accept an actual instance or an array used by Angular
to define a provider, `['dep1', 'dep2', MyService]`. In the case of an array,
it will assume the last item in the array is the function to instantiate to
create the provider.

#### Known Limitations

_NOTE: This is NOT a problem when following the "preferred usage"_

With "Direct Usage", nullMock actually instantiates (or invokes) the function you give it
in order to create the instance. It needs an instance so it can iterate
over the methods to create the spies. A problem can arise in that no arguments
will be provided to the function (since nullMock knows nothing about those).
For example, this works fine:

```
class MyService {
  constructor($http) {
    this.$http = $http;
  }
}
```

Even though `$http` will be passed as `undefined` to the constructor, no errors will be thrown.
That is because it is completely valid (from a runtime perspective) to set `this.$http` to `undefined`.
Its obviously not "correct", but it is enough to get an instance to spy on the methods.

Something like this will cause an error though:

```
class MyService {
  constructor(userService) {
    this.currentUser = userService.currentUser;
  }
}
```

The problem here is `userService.currentUser`. Since `userService` is going to be
`undefined` trying to access a property (or method for that matter) is going to throw.
