# FullStackOpen 2021
### Deep Dive Into Modern Web Development
> Learn React, Redux, Node.js, MongoDB, GraphQL and TypeScript in one go! This course will introduce you to modern JavaScript-based web development. The main focus is on building single page applications with ReactJS that use REST APIs built with Node.js.


## Course Exercises

##### Part 0 
### Fundamentals of Web Apps
* [Traditional Web Apps, SPA, HTML, CSS, Forms Review](https://github.com/jbryan11/fullstack-open-2021/tree/main/part0)

##### Part 1 
### Introduction to React

* [Course Information, Anecdotes, Unicafe](https://github.com/jbryan11/fullstack-open-2021/tree/main/part1)

## What I Learned

### Part 1
1.  Handling complex states - e.g object states, array states...
2.  Update object state properties efficiently.
3.  Performing mutation directly to a state does work sometimes <br/>
    but its not a good way of mutating a state. Instead use <code>setState</code> to mutate it.
4.  State should be treated as an immutable.
5.  Array Concat method returns new copy of an array with the
    item added to it.
6.  Using concat method to update array state rather than mutating it using <code>array.push</code> method which mutates the state directly. 
7.  Understand more about how conditional rendering works.
8.  Use the available debugging tools that browsers or IDEs offer to better understand the bug that caused the error.
9.   Hooks like <code>useState</code> should not be called inside loops, conditional expressions, and function defining a component. Instead, it should be called in a function that defines a React Component.
10. Do not define component inside of another component.
### Part 2
1.  When using a <code>console.log</code>, do not concatenate things. Instead use comma to separate those elements.
2.  Create my custom snippets in vscode.
3.  Adding key attributes of objects in an array lets React know how to update the components that have been changed and will be subject to re-render.
4.  Use index arrays for items that is static, no ids, or is never reordered or filtered. It is not advisable to use this as it can confuse React identifying DOM elements.
5.  The Javascript's Event loop and how does it work along with the browser engine.
6.  Javascript engines are single-threaded but uses asynchronous models to run IO operations so that the browser would not freeze during an instance.
7.   Axios, a promise-based library, is used for establishing communication and fetch data from the server.
8.  Promises have  three states : Pending - the final value isn't available yet ; Fullfilled - operation is completed and final value is available ; Rejected - error occured that prevented the final value being determined.
9.  Effects Hook performs side effects or like a background process in function component. A common examples of using the hook is by Data fetching.