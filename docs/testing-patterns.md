Testing Patterns
==================

Some patterns and practices for Angular tests.

## Declare all mocked injections under one object

Put all dependencies that you are mocking under a single object with property
names that match the dependency name. For example:

```
beforeEach(() => {
    mocks = {
        service1: dngTestUtils.nullMock(service1),
        service2: dngTestUtils.nullMock(service2),
        value1: { key: 'value' }
    };

    angular.mock.module(mocks);
});
```

So this might match up to a controller you are testing with a constructor like
`MyController(service1, service2, value1)`. The [angular.mock.module](https://docs.angularjs.org/api/ngMock/function/angular.mock.module) docs subtly mention this under the Usage section.

## Use nullMock whenever practical

Using nullMock helps to protect you against method names changing in the implementation but not in your consumers and tests. For example, imagine we have a UserController which depends on a userService.

```
class UserController {
  constructor(userService) {
    userService.loadUsers().then(users => {
      this.users = users;
    });
  }
}
```

If we are creating a spy by hand in the test then we are setting ourselves up for a potential false positive:

```
const userServiceSpy = jasmine.createSpyObj('userService', ['loadUsers']);
```

What happens if we rename `loadUsers` to `fetchUsers` in the future but forget to update our controller? The controller tests will still pass because our spy has a method named `loadUsers` even though the actual service no longer does.

Using nullMock prevents this because the spy that is created will be based on the actual implementation. If we change the service then the spies being run through nullMock will also change - which in this example means our controller tests will produce a failure (which is good!).

## Keep logic out of initialization (when possible)

Code like this is cumbersome to test

```
constructor(value1, value2) {
  this.currentOption = value1 ? 'option1' : 'option2';

  this.setAnotherValue(value1, value2);
}
```

In both cases you will need to re-construct your controller with different values to check for different cases.

Instead, I find it better to move logic like this out to a pure function which just returns a result and can be tested much easier in isolation.

```
constructor(value1, value2) {
  this.currentOption = this.getCurrentOption(value1);
  this.anotherValue = this.getAnotherValue(value1, value2);
}

getCurrentOption(value) {
  return value ? 'option1' : 'option2';
}

getAnotherValue(value1, value2) {
  return 'something';
}
```

Now we can easily test all code paths for those options by simply providing input params. I would most likely still have a test to make sure those properties are initialized in the constructor, but I wouldn't be as concerned with their values since I can test that portion in isolation.

You could argue that you are now making public methods just for the sake of testing. That is a valid argument, but I find it an acceptable compromise in this situation.

Also note, in Angular 1.6+ this kind of code should be in `$onInit` but the same ideas apply.
