const InputForm=({formHandler, children})=>{
    return(
        <form onSubmit={formHandler}>
				{children}
				<div>
					<button type="submit">add</button>
				</div>
			</form>
    )
}
export default InputForm