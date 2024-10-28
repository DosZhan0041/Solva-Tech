import './People.css'
import PeopleBlock from './PeopleBlock';

let People = (props) => {
    
    let currentPage = props.SWpage.currentPeoplePage
    const handleNext = ()=>{
        if(currentPage < props.SWpage.totalPeoplePages){
            props.setPeoplePage(currentPage + 1)
        }
    }

    const handlePrevious = ()=>{
        if(currentPage > 1){
            props.setPeoplePage(currentPage - 1)
        }
    }

    return(
        <div className='people'>
            <div className='people-up'>
                <h1>Welcome to the website Star Wars!</h1>
                <p>you can watch all the Star Wars characters here and get acquainted with a lot of information!</p>
            </div>
            <div className='people-down'>
                {   
                    props.SWpage.people.map((person, index)=>{
                        const id = (currentPage - 1) * 10 + index + 1;                         
                        return(
                            <PeopleBlock name={person.name} id={id} key={id} image={`https://starwars-visualguide.com/assets/img/characters/${(currentPage - 1) * 10 + index + 1}.jpg`}/>
                        )
                    })
                }
            </div>
            <div className='people-pagination'>
                <button onClick={handlePrevious} disabled={props.SWpage.currentPeoplePage === 1}>Previous</button>
                <button onClick={handleNext} disabled={props.SWpage.currentPeoplePage === props.SWpage.totalPeoplePages}>Next</button>
            </div>
        </div>
    )
}
export default People;