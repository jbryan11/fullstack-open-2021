import React from 'react'
import Header from './Header.jsx'
import Content from "./Content.jsx";
import Total from './Total.jsx'

const Course = ({course}) => {
	return (
		<React.Fragment>
			<Header title={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts}/>
		</React.Fragment>
	);
};
export default Course
