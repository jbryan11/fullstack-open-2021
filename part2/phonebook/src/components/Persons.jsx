const Persons=({list})=>{
    return list.map((person) => (
        <p key={person.name}>
            {person.name} {person.phone}
        </p>
    ))
}
export default Persons