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

### Part 1d
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
