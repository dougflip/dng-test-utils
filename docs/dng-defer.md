dngDefer
===========

A helper for working with promises and digest cycles.
Injected into your tests as `dngDefer`.
See [dng-test-utils_test.js](../test/dng-test-utils_test.js) for more detailed usage.

#### defer

Returns an object of the structure:

```
{
  promise,
  resolveAndDigest,
  rejectAndDigest
}
```

This is somewhat low level and general purpose.
It is also not tied to Jasmine spies at all so it can be used even if you are not working with Jasmine.

#### deferSpy

Takes a spy as a param, configures it to return a promise, and returns you back the dngDefer object (the result of the defer method as documented above):

```
const spy = jasmine.createSpy('spy')
const deferred = dngDefer.deferSpy(spy);
spy().then(done);
deferred.resolveAndDigest('resolved!');
```

This is useful for methods that return a promise directly.

#### deferSpyWithResult

Takes a spy similar to `deferSpy`, but wraps the resulting promise in an object under a `result` property. This is common for modal implementations in Angular and I use this pattern in my code when not returning a promise directly.

```
const deferred = dngDefer.deferSpyWithResult(mocks.modal.open);
mocks.modal.open().result.then(done);
deferred.resolveAndDigest('resolved!');
```
