nullMock
==========

Makes creating spies of an existing instance quick and easy.

## Usage

```
import dngTestUtils from 'dng-test-utils';
import actualService from './actual-service';

beforeEach(() => {
  const spy = dngTestUtils.nullMock(actualService);
});
```

The `spy` in the above code will have all of the same methods as `actualService`
but they will all be Jasmine spies. This makes it much easier to create a spy
and has the added benefit that [spies stay in sync with your implementation](./testing-patterns.md#use-nullmock-whenever-practical).

The nullMock function can accept an actual instance or an array used by Angular
to define a provider, `['dep1', 'dep2', MyService]`. In the case of an array,
it will assume the last item in the array is the function to instantiate to
create the provider.

## Known Limitations

Currently, nullMock actually instantiates (or invokes) the function you give it
in order to create the instance. It needs an instance so it can loop
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
I have some ideas to properly work around this, but at this time it is just a limitation.
