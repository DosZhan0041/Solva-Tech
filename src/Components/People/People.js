import Preloader from '../Preloader/Preloader';
import './People.css';
import PeopleBlock from './PeopleBlock';

let People = (props) => {
    
    let currentPage = props.PeoplePage.currentPeoplePage;
    
    const handleNext = () => {
        if (currentPage < props.PeoplePage.totalPeoplePages) {
            props.setPeoplePage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            props.setPeoplePage(currentPage - 1);
        }
    };

    return (
        <div className='people'>
            {
                props.isLoad ? <Preloader />
                :
                (
                    <div className='people-wrapper'>
                        <div className='people-up'>
                            <h1>Welcome to the website Star Wars!</h1>
                            <p>you can watch all the Star Wars characters here and get acquainted with a lot of information!</p>
                        </div>
                        <div className='people-down'>
                            {   
                                props.PeoplePage.people.map((person, index) => {
                                    const id = (currentPage - 1) * 10 + index + 1;
                                    const adjustedId = id >= 17 ? id + 1 : id;

                                    return (
                                        <PeopleBlock 
                                            name={person.name} 
                                            id={adjustedId} 
                                            key={adjustedId} 
                                            image={`https://starwars-visualguide.com/assets/img/characters/${adjustedId}.jpg`}
                                        />
                                    );
                                })
                            }
                        </div>
                        <div className='people-pagination'>
                            <button onClick={handlePrevious} disabled={props.PeoplePage.currentPeoplePage === 1}>Previous</button>
                            <button onClick={handleNext} disabled={props.PeoplePage.currentPeoplePage === props.PeoplePage.totalPeoplePages}>Next</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default People;
