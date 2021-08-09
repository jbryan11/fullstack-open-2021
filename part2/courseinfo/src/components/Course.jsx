import React from 'react'
import Header from './Header.jsx'
import Content from "./Content.jsx";

const Course = ({ course }) => {
	return (
		<React.Fragment>
			<Header course={course} />
			<Content course={course} />
		</React.Fragment>
	);
};
export default Course
