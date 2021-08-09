import Part from "./Part.jsx";
const Content = ({ parts }) => {
	return (
		<div>
			{parts.map((coursePart) => (
				<Part key={coursePart.id} part={coursePart} />
			))}
		</div>
	);
};
export default Content;
