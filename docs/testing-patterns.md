Testing Patterns
==================

Some patterns and practices for Angular tests.
These are not hard and fast rules but rather guidelines that I recommend defaulting
too and leaving only when it makes sense.

## Use dngTestUtils.init

The `init` method allows you to declare to styles of dependencies:

- nullMocks
- customMocks

You should use nullMocks whenever you are mocking a normal dependency registered
with Angular. Services and Factories are good examples of this category.

You should use customMocks when you are mocking out more of a local dependency.
A `resolve` dependency from UI router is a good example of this.

## Favor nullMocks

Using nullMock helps to protect you against method names changing in the
implementation but not in your consumers and tests. For example, imagine we have
a UserController which depends on a userService.

```
class UserController {
  constructor(userService) {
    userService.loadUsers().then(users => {
      this.users = users;
    });
  }
}
```

If we are creating a spy by hand in the test then we are setting ourselves up for
a potential false positive:

```
const userServiceSpy = jasmine.createSpyObj('userService', ['loadUsers']);
```

What happens if we rename `loadUsers` to `fetchUsers` in the future but forget to
update our controller? The controller tests will still pass because our spy has
a method named `loadUsers` even though the actual service no longer does.

Using nullMock prevents this because the spy that is created will be based on the
actual implementation. If we change the service then the spies being run through
nullMock will also change - which in this example means our controller tests will
produce a failure (which is good!).

## Keep logic out of initialization (when possible)

Code like this is cumbersome to test

```
constructor(value1, value2) {
  this.currentOption = value1 ? 'option1' : 'option2';

  this.setAnotherValue(value1, value2);
}
```

In both cases you will need to re-construct your controller with different values
to check for different cases.

Instead, I find it better to move logic like this out to a pure function which
just returns a result and can be tested much easier in isolation.

```
constructor(value1, value2) {
  this.currentOption = this.createCurrentOption(value1);
  this.anotherValue = this.createAnotherValue(value1, value2);
}

createCurrentOption(value) {
  return value ? 'option1' : 'option2';
}

createAnotherValue(value1, value2) {
  return 'something';
}
```

Now we can easily test all code paths for those options by simply providing input
params. I would most likely still have a test to make sure those properties are
initialized in the constructor, but I wouldn't be as concerned with their values
since I can test that portion in isolation.

You could argue that you are now making public methods just for the sake of testing.
That is a valid argument, but I find it an acceptable compromise in this situation.

Also note, in Angular 1.6+ this kind of code should be in `$onInit` but the same
ideas apply.
