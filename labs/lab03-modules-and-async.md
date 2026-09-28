# Lab 03 - Modularity and Asynchronous Programming – Promises

# 1. Modularity – ECMAScript Modules

Create a small program that demonstrates how to reuse functions through modules.

### Create a module (`functions.js`)

* Include the two functions from Exercises 1.6 and 1.7 from the previous week.
* Export them so that they can be reused.

### Create a main module (`main.js`)

* Import the functions module.
* Define a `main` function that calls the imported functions and logs the
  results.
* Call `main()` at the end to run the program.

# 2. Asynchronous Programming – Promises

## 2.1 File System with Promises (Node.js)

Using the Node.js **Promises API** for file access, complete the tasks described
below.

You must implement **two separate functions**, each with a clear and
well-defined responsibility.

### Function 1 – `readAndFilter()`

Implement a function called **`readAndFilter()`** that performs the following:

1. Reads the [liga.json](liga.json) file using `readFile` of `fs/promises` module.
2. Parses the file content from JSON into a JavaScript object or array using
   `JSON.parse`.
3. Filters the teams and keeps only those whose number of goals scored
   (**`goals`**) is **greater than 10**.
4. Returns the filtered array.

### Function 2 – `saveResult(filteredTeams)`

Implement a function called **`saveResult()`** that:

1. Receives the filtered array returned by `readAndFilter()`.
2. Converts this array into JSON using `JSON.stringify(filteredTeams)`.
3. Writes the result to a new file called **`liga10goals.json`** using
   `writeFile` of `fs/promises` module.

### Final Goal

Create a small **`main()`** function (or similar control code) that:

1. Calls `readAndFilter()` to obtain the filtered teams.
2. Passes the result to `saveResult()`.

When executed, the program should produce the file:

```
liga10goals.json
```

containing only the teams that scored more than 10 goals.

### Example Output (inside `liga10goals.json`)

```json
[
  { "team": "FC Porto", "points": 21, "goals": 18 },
  { "team": "Benfica", "points": 16, "goals": 22 },
  { "team": "Sporting CP", "points": 15, "goals": 17 },
  { "team": "Santa Clara", "points": 15, "goals": 11 },
  { "team": "Estrela da Amadora", "points": 10, "goals": 14 }
]
```

## Exercise 2.2 – Fetch API (Node.js)

Using the **Fetch API**, write a program that retrieves information about
animated movies from a web API and saves the titles of all the movies to a local
JSON file.

You must implement **two separate functions**, each with a clear and
well-defined responsibility.

### Function 1 – `fetchMovies()`

Implement a function called **`fetchMovies()`** that performs the following:

Make an HTTP GET request to:

```text
https://api.sampleapis.com/movies/animation
```

1. Uses the **Fetch API** to retrieve the data.
2. Parses the response as JSON using `response.json()`.
3. Extracts only the movie **titles** from the returned objects.
4. Returns an array of movie titles.

### Function 2 – `saveTitles(titles)`

Implement a function called **`saveTitles()`** that:

1. Receives the array of movie titles returned by `fetchMovies()`.
2. Converts the array into formatted JSON using:

```javascript
JSON.stringify(titles, null, 2)
```

3. Saves this JSON to a file called:

```text
animationTitles.json
```

using `writeFile` of `fs/promises` module.

### Final Goal

Write a small `main()` function (or similar) that:

1. Calls `fetchMovies()` to obtain the titles.
2. Passes the result to `saveTitles()`.

When executed, the program should create the file:

```
animationTitles.json
```

containing all the movie titles retrieved from the API.

### Example Output (inside `animationTitles.json`)

```json
[
  "Spirited Away",
  "Toy Story",
  "How to Train Your Dragon",
  "Zootopia"
]
```

The actual titles will depend on the API response.
