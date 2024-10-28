import './PeopleDescription.css'

let PeopleDescription = (props) => {
    return(
        <div className='PeopleDescription'>
            <p>{props.onePerson.name}</p>
        </div>
    )
}
export default PeopleDescription;