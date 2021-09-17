const Input = ({handler, value, children }) => {
	return (
		<div>
			{children}: <input onChange={handler} value={value}/>
		</div>
	);
};
export default Input