# Lab 03 - JavaScript Exercises

Implement the following functions:

### 1. `function showProperties(obj)`

Receives an object `obj`.

Prints the name and type of each property in the object to the console.

**Example:**

```javascript
const o = {a: 1, b: 'Thor', c: [1, 2, 3], d: {x: 10}}

showProperties(o)

// Output:
// a: number
// b: string
// c: object
// d: object
```

**NOTES:**

* To implement this function, you must use the `for-in` loop and indexed
  property access.

---

### 2. `function executeFunctions(funcArray)`

Receives an array `funcArray`.

Executes all functions present in the array, assuming that they do not receive
any parameters.

**Example:**

```javascript
function sayHi() {
    console.log('Hi')
}

function sayBye() {
    console.log('Bye')
}

executeFunctions([sayHi, "Oops", , sayBye])

// Output:
// Hi
// Bye
```

---

### 3. `function filterProduct(products, minPrice)`

Receives an array `products` (objects with at least a `price` property) and a
number `minPrice`.

Returns a new array containing only the products whose price is greater than
`minPrice`.

**Example:**

```javascript
const products = [
  {name: 'Apple', price: 5},
  {name: 'Orange', price: 10},
  {name: 'Banana', price: 3}
]

const expensive = filterProduct(products, 4)

// expensive: [
//   {name: 'Apple', price: 5},
//   {name: 'Orange', price: 10}
// ]
```

---

### 4. `function mapProduct(products)`

Receives an array `products`.

Returns a new array containing only the names of the products.

**Example:**

```javascript
const products = [
  {name: 'Apple', price: 5},
  {name: 'Orange', price: 10},
  {name: 'Banana', price: 3}
]

const names = mapProduct(products)

// names: ['Apple', 'Orange', 'Banana']
```

---

### 5. `function reduceProduct(products)`

Receives an array `products`.

Returns the total sum of the prices of all products.

**Example:**

```javascript
const products = [
  {name: 'Apple', price: 5},
  {name: 'Orange', price: 10},
  {name: 'Banana', price: 3}
]

const total = reduceProduct(products)

// total: 18
```

---

### 6. `function filter(array, predicate)`

Receives an array `array` and a function `predicate`.

The `predicate` function receives an element of the array as an argument and
returns `true` or `false`, depending on whether the element should be included
in the new array.

**Example:**

```javascript
const numbers = [1, 2, 3, 4, 5]

const even = filter(numbers, n => n % 2 === 0)

// even: [2, 4]
```

---

### 7. `function map(array, transformation)`

Receives an array `array` and a function `transformation`.

The `transformation` function receives an element of the array as an argument
and returns a new value, which will be placed at the corresponding position in
the new array.

**Example:**

```javascript
const numbers = [1, 2, 3]

const doubled = map(numbers, n => n * 2)

// doubled: [2, 4, 6]
```

---

### 8. `function reduce(array, operation, [initialValue])`

Receives an array `array`, a function `operation`, and, optionally, an initial
value `initialValue`.

The `operation` function receives two arguments: the accumulator (`accumulator`)
and the current array element (`element`).

On each iteration, it returns the next value of the accumulator. The final
result is the accumulated value.

**Example:**

```javascript
const numbers = [1, 2, 3, 4]

const sum = reduce(numbers, (acc, n) => acc + n, 0)

// sum: 10
```

## Check Your Understanding

Answer these questions in your own words to confirm that you understood the
main ideas of the exercises:

1. What is the purpose of `showProperties(obj)` and which JavaScript construct
   is required to implement it?
2. How does `executeFunctions(funcArray)` behave when the array contains a
   non-function value such as a string or an empty slot?
3. What is the main difference between `filter` and `map` when processing an
   array?
4. In `reduce`, what is the role of the accumulator, and why is an initial
   value sometimes necessary?
5. Why are these array operations useful when working with collections of
   products or numbers in JavaScript?



