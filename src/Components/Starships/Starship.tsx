import React from 'react';
import Preloader from '../Preloader/Preloader';
import './Starship.css';
import StarshipBlock from './StarshipBlock';

interface StarshipType{
    name: string,
    model: string,
    cost_in_credits: string,
    length: string,
    passengers: string,
    starship_class: string,
    max_atmosphering_speed: string,
    crew: string,
    url : string
}

interface authUserType{
    email: string,
    password: string
}

interface StarshipPageType{
    Starship: StarshipType[],
    currentStarshipPage: number,
    isLoad: boolean,
    totalStarshipPages: number
}

interface propsType{
    StarshipPage: StarshipPageType,
    authUser: authUserType,
    isLoad: boolean,
    getStarship: (Starship: any[], totalStarshipCount: number)=> void;
    setStarshipPage: (page: number)=>void;
    togglePreloader: (status: boolean)=>void;
}

let Starships: React.FC<propsType> = (props) => {
    let currentPage = props.StarshipPage.currentStarshipPage;
    const handleNext = () => {
        if (currentPage < props.StarshipPage.totalStarshipPages) {
            props.setStarshipPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            props.setStarshipPage(currentPage - 1);
        }
    };

    return (
        <div className='Starship'>
            {
                props.isLoad ? <Preloader />
                :
                (
                    <div className='Starship-wrapper'>
                        <div className='Starship-down'>
                            {   
                                props.StarshipPage.Starship.map((Starship) => {
                                    const idMatch = Starship.url.match(/\/(\d+)\/$/);
                                    const adjustedId = idMatch ? idMatch[1] : null;

                                    return (
                                        <StarshipBlock 
                                            name={Starship.name} 
                                            id={adjustedId} 
                                            key={adjustedId} 
                                        />
                                    );
                                })
                            }
                        </div>
                        <div className='Starship-pagination'>
                            <button onClick={handlePrevious} disabled={props.StarshipPage.currentStarshipPage === 1}>Previous</button>
                            <button onClick={handleNext} disabled={props.StarshipPage.currentStarshipPage === props.StarshipPage.totalStarshipPages}>Next</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Starships;
