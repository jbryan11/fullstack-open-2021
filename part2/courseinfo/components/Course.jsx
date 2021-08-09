import React from "react";
import Header from '../components/Header'
import Content from "../components/Content";

const Course = ({ course }) => {
	return (
		<React.Fragment>
			<Header course={course} />
			<Content course={course} />
		</React.Fragment>
	);
};
export default Course
