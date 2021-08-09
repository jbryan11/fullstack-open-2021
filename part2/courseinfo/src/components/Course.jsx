import React from 'react'
import Header from './Header.jsx'
import Content from "./Content.jsx";
import Total from './Total.jsx'

const Course = ({ course }) => {
	return (
		<React.Fragment>
			<Header course={course} />
			<Content course={course} />
			<Total course={course}/>
		</React.Fragment>
	);
};
export default Course
