# Lab 04 — Promises and `Promise.all()`

## Week 3 Exercises: Promises

All exercises use the **SampleAPIs Movies API**:

```js
const API_BASE = "https://api.sampleapis.com/movies/";
```

---

## Part 1: Consuming Promises

`fetch()` returns a Promise. Let's learn how to consume Promises and work with
the values they eventually produce.

<details>
<summary>📚 Recall: Promise</summary>

A Promise represents the eventual result of an asynchronous operation.

A Promise can be:

* **pending** — the operation hasn't completed yet
* **fulfilled** — the operation completed successfully
* **rejected** — the operation failed

Use `.then()` to work with fulfilled values and `.catch()` to handle errors.

</details>

### Exercise 1

Fetch all animation movies from the API and log how many there are.

```js
fetch(`${API_BASE}animation`)
  .then((response) => {
    // response.json() also returns a Promise!
  })
  .then((animation) => {
    // log the number of movies
  });
```

> 💡 **Notice:** `response.json()` returns a Promise. Return that Promise from
> the first `.then()` so that the next `.then()` receives the parsed data.

---

### Exercise 2

Fetch the animation movie with ID `6` and log its title.

```js
fetch(`${API_BASE}animation/6`)
  .then((response) => {
    // your code
  });
```

Expected output:

```text
Toy Story 2
```

Remember that `fetch()` does not reject its Promise simply because the server
responds with an HTTP error such as `404` or `500`.

Use `response.ok` to verify that the HTTP request was successful.

---

### Exercise 3

#### Part 1

Create a function `fetchMovieName(id)` that receives a movie ID and returns a
Promise that resolves with the movie title.

If the HTTP response is not successful, reject the Promise chain by throwing an
error.

Do **not** use `.catch()` inside this function. Let errors propagate to the
caller.

```js
function fetchMovieName(id) {
  // your code
}
```

#### Part 2

In `main()`, call `fetchMovieName()` and display either the movie name or the
error.

```js
function main() {
  // your code
}

main();
```

Expected output for ID `9789`:

```text
Error: HTTP error: 404
```

Then try again with a valid ID, for example `6`.

---

# Part 2: Chaining Promises

A Promise returned from one `.then()` can be consumed by the next `.then()`.

This allows asynchronous operations to be performed sequentially without deeply
nesting callbacks.

<details>
<summary>📚 Recall: Chaining</summary>

`.then()` itself returns a new Promise.

If the callback passed to `.then()` returns:

* a regular value, the next `.then()` receives that value;
* a Promise, the next `.then()` waits for that Promise and receives its
  fulfilled value;
* or throws an error, the Promise chain becomes rejected.

This makes it possible to compose several asynchronous operations into one
Promise chain.

</details>

### Exercise 4

Create a function:

```js
function fetchAndSavePoster(id) {
  // your code
}
```

The function must:

1. Fetch the movie from `${API_BASE}animation/${id}`.
2. Check that the HTTP response was successful.
3. Parse the movie JSON.
4. Read the `posterURL` property from the movie.
5. Fetch the JPG from that URL.
6. Check that the poster HTTP response was successful.
7. Read the poster's binary data.
8. Save the poster as `poster-${id}.jpg` using `writeFile` from `fs/promises`.
9. Return a Promise that resolves only after the file has been saved.

Start with:

```js
import { writeFile } from "fs/promises";

function fetchAndSavePoster(id) {
  // your code
}

fetchAndSavePoster(6)
  .then(() => console.log("Poster saved"))
  .catch((error) => console.error("Error:", error.message));
```

> **Hint:** After fetching the JPG, call `response.arrayBuffer()` to read its
> binary content.
>
> `response.arrayBuffer()` returns a **Promise**, not the `ArrayBuffer`
> directly. Return that Promise and use another `.then()` to access the
> resulting `ArrayBuffer`.
>
> In Node.js, convert the resulting `ArrayBuffer` into a `Buffer`:
>
> ```js
> Buffer.from(arrayBuffer)
> ```
>
> Pass that `Buffer` to `writeFile()`.

---

# Part 3: Creating Promises

So far, we have consumed Promises created by APIs such as `fetch()`.

Now let's create our own Promise.

<details>
<summary>📚 Recall: resolve / reject</summary>

A Promise can be created with:

```js
new Promise((resolve, reject) => {
  // asynchronous operation
});
```

Call `resolve(value)` when the operation succeeds.

Call `reject(error)` when it fails.

The resolved value becomes available to `.then()`, while a rejection can be
handled with `.catch()`.

</details>

### Exercise 5

Create a function:

```js
function wait(ms) {
  // your code
}
```

It must return a Promise that resolves after `ms` milliseconds.

Use `setTimeout()` inside `new Promise()`.

Test it with:

```js
console.log("Starting...");

wait(2000)
  .then(() => console.log("2 seconds passed!"));
```

Expected behavior:

```text
Starting...
```

and approximately two seconds later:

```text
2 seconds passed!
```

> 💡 Wrapping a callback-based API in a Promise is commonly called
> **promisifying** it.

---

### Exercise 6 ⭐

Implement:

```js
function fetchAndSavePosterDelayed(id, ms) {
  // your code
}
```

The function must:

1. Receive a movie ID and a delay in milliseconds.
2. Call the previous `wait(ms)` function.
3. After the delay has completed, call `fetchAndSavePoster(id)`.
4. Return a Promise that resolves only after the poster has been saved.

You must compose the existing `wait(ms)` and `fetchAndSavePoster(id)` Promises.

Do **not** create another Promise with `new Promise()`.

Test it with:

```js
console.log("Waiting before saving...");

fetchAndSavePosterDelayed(6, 2000)
  .then(() => console.log("Poster saved after delay"))
  .catch((error) => console.error("Error:", error.message));
```

> **Hint:** `wait(ms)` already returns a Promise. Chain it with `.then()` and
> return the Promise produced by `fetchAndSavePoster(id)`.

---

# Part 4: Sequential and Concurrent Promises

There are different ways to compose multiple asynchronous operations.

In Exercise 7, you will execute requests **sequentially**.

In Exercise 8, you will use `Promise.all()` to execute them **concurrently**.

This lets us compare the two approaches.

---

## Exercise 7 — Sequential requests

Implement:

```js
function fetchMovieNames(...ids) {
  // your code
}
```

The function must:

1. Receive a variable number of movie IDs.
2. Fetch each movie name using the previous `fetchMovieName(id)` function.
3. Execute the requests **sequentially**.
4. Wait `500` ms after one request completes before starting the next request.
5. Return a Promise that resolves to an array containing all movie names in the
   same order as the supplied IDs.

For example, the execution should behave approximately like this:

```text
fetch movie 6
      ↓
   wait 500ms
      ↓
fetch movie 22
      ↓
   wait 500ms
      ↓
fetch movie 7
      ↓
return names
```

### Requirements

Do **not**:

```js
Promise.all(...)
```

and do **not** create your own Promise with:

```js
new Promise(...)
```

Instead:

1. Use `.reduce()` to build a Promise chain.
2. Use `.then()` inside the `.reduce()` operation to perform each request after
   the previous one.
3. Use `Promise.resolve([])` as the initial value (seed) of the reduction.
4. Use the previous `wait(500)` function to introduce the delay between
   requests.

Test it with:

```js
fetchMovieNames(6, 22, 7)
  .then((names) => console.log(names))
  .catch((error) => console.error("Error:", error.message));
```

Expected output:

```js
["Toy Story 2", "The Incredibles", "Up"]
```

> 💡 **Think about it:** Why does `Promise.resolve([])` make a useful initial
> value for the `.reduce()` operation?

---

## Exercise 8 — Concurrent requests with `Promise.all()`

Create another implementation:

```js
function fetchMovieNames2(...ids) {
  // your code
}
```

It must perform the same movie-name lookup as `fetchMovieNames()`, but this time
take advantage of
[`Promise.all()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all).

The function must:

1. Receive a variable number of movie IDs.
2. For each ID, wait `500` ms using the previous `wait(ms)` function.
3. After the delay, call `fetchMovieName(id)`.
4. Use `.map()` to create an array of Promises, one for each movie ID.
5. Use `Promise.all()` to combine those Promises.
6. Return a Promise that resolves to an array of movie names in the same order
   as the supplied IDs.

Unlike Exercise 7, the Promises are created without waiting for the previous one
to finish. Therefore, their `500` ms delays run concurrently.

The execution should behave approximately like this:

```text
movie 6  → wait 500ms → fetch movie 6
movie 22 → wait 500ms → fetch movie 22
movie 7  → wait 500ms → fetch movie 7
             │
             └── delays happen concurrently
```

Test it with:

```js
fetchMovieNames2(6, 22, 7)
  .then((names) => console.log(names))
  .catch((error) => console.error("Error:", error.message));
```

Expected output:

```js
["Toy Story 2", "The Incredibles", "Up"]
```

<details>
<summary>📚 Recall: Promise.all()</summary>

`Promise.all()` receives an iterable of Promises:

```js
Promise.all([promise1, promise2, promise3])
```

It returns a Promise that fulfills when **all** of the supplied Promises
fulfill.

The fulfilled value is an array containing their results in the **same order as
the supplied Promises**, regardless of the order in which they finish.

If any supplied Promise rejects, the Promise returned by `Promise.all()` rejects
with that error.

</details>

### Questions

1. In Exercise 7, are the `500` ms waits sequential or concurrent?
2. In Exercise 8, are the `500` ms waits sequential or concurrent?
3. Approximately how long does the waiting portion take for three movies in each
   implementation?
4. Does `Promise.all()` preserve the order of the results if the requests finish
   in a different order?
5. What happens if one `fetchMovieName()` call rejects?
