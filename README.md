### JS Decorators

Using function mutation. `Warning` this is just an experiment. The performance of this code is probably terrible and might have weird effects in differnt situations. You can find the file in 

```
src / index.js
```

it exposed the Decorate constructor... see below for examples or visit 

```
test / runTest.html
```

#### The Idea

Have JS Decorators similair to python ones, and allow for variable manipulation and a shared private scope between decorators and primary function.

#### Samples 

all arguments passed into a decorated function should be mutatable and should reflect that in the primary fn.

  eg.

```javascript
function decor ( a, b ) {
  a = a + b;
}

function primary ( a, b ) {
  return a;
}

primary = new Decorate( primary, decor );
primary( 1, 2 ); // 3
```

decorators can cancel out fn before it hits the primary fn

```javascript
function decor ( ) {
  return 'im return from a decorator';
}

function primary () {
  return 'im returning the primary stuff'
}

primary = new Decorate( primary, decor );
primary( ); // 'im return from a decorator'
```

variables can be passed from decorator to primary function.

```javascript
function decor ( ) {
  var c = true;
}

function primary ( ) {
  if ( c ) {
    return "C is defined"
  }
}

primary = new Decorate( primary, decor );
primary( ); // 'C is defined'
```