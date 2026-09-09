# Lab 01 -  Install Node.js and Create a JavaScript Program

Before creating the JavaScript program, install Node.js on your computer.

### 1. Download and install Node.js from the official website:

[Node.js Downloads](https://nodejs.org/)

Choose the version recommended for most users (LTS) and follow the installation instructions for your operating system.

After installation, open a new terminal or command prompt and confirm that Node.js is available:

```bash
node --version
```

You can also check that the Node Package Manager (npm) was installed:

```bash
npm --version
```

### Concept

Node.js is a JavaScript runtime that allows you to execute JavaScript programs outside a web browser.

In this lab, you will use Node.js to run a simple JavaScript program from the command line. This introduces the basic workflow of creating source code, running it locally, and then tracking it with Git.

### 2. Create a JavaScript Program

Inside a new folder `lab02-intro`, create a file named:

```text
hello.js
```

Add the following code:

```javascript
console.log("Hello World");
```

Run the program from the terminal:

```bash
node hello.js
```

The expected output is:

```text
Hello World
```

### 3. Add the JavaScript Program to Git

Check the repository status:

```bash
git status
```

You should see `hello.js` listed as an untracked file.

Stage the file:

```bash
git add hello.js
```

Create a commit:

```bash
git commit -m "Add Hello World JavaScript program"
```

Finally, publish the new commit to GitHub:

```bash
git push
```

### Concept

This demonstrates the complete basic Git workflow:

1. **Create** a file in the working directory.
2. **Check** the repository status with `git status`.
3. **Stage** the file with `git add`.
4. **Commit** the staged changes with `git commit`.
5. **Push** the commit to the remote repository with `git push`.

After pushing, `hello.js` should be visible in your private GitHub repository alongside `README.md`.

### What You Should Understand

After this section, you should be able to:

- install Node.js and verify the installation
- create a basic JavaScript program
- execute JavaScript using Node.js
- understand the difference between a source file and its output
- add a new file to an existing Git repository
- commit and push additional changes to GitHub.

## Check Your Understanding

Answer these questions in your own words to confirm that you understood the
main ideas of the lab:

1. Why is Node.js necessary to run a JavaScript file from the terminal?
2. What does the command `node hello.js` do in practice?
3. What is the difference between creating a file and committing it to Git?
4. Why is `git status` useful before staging and committing changes?
5. What is the purpose of `git push` in the workflow of this lab?

