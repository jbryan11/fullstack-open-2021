const Notifications=({isError,message})=>{
    const boxStyle = isError? "error": "success"
    if(message === null) {return null}
    return(
        <div className={`${boxStyle} container notification`}>
            <p>{message}</p>
        </div>
    )
}
export default Notifications