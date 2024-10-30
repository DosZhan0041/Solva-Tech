import React from 'react';
import Preloader from '../Preloader/Preloader';
import './Planets.css';
import PlanetsBlock from './PlanetsBlock';

interface Planet {
    name: string,
    rotation_period: string,
    orbital_period: string,
    diameter: string,
    climate: string,
    gravity: string,
    terrain: string,
    population: string
}

interface PlanetPageType{
    currentPlanetPage: number,
    isLoad: boolean,
    planet: Planet[],
    totalPlanetPages: number
}

interface authUserType{
    email: string,
    password: string
}

interface propsType {
    PlanetPage: PlanetPageType,
    authUser: authUserType,
    isLoad: boolean,
    getPlanet:(planet: any[], totalPlanetCount: number)=>void;
    setPlanetPage:(page: number)=>void;
    togglePreloader: (status: boolean)=>void;
}

let Planets: React.FC<propsType> = (props) => {    
    
    let currentPage = props.PlanetPage.currentPlanetPage;
    
    const handleNext = () => {
        if (currentPage < props.PlanetPage.totalPlanetPages) {
            props.setPlanetPage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            props.setPlanetPage(currentPage - 1);
        }
    };

    return (
        <div className='Planet'>
            {
                props.isLoad ? <Preloader />
                :
                (
                    <div className='Planet-wrapper'>
                        <div className='Planet-down'>
                            {   
                                props.PlanetPage.planet.map((planet, index) => {
                                    const id = (currentPage - 1) * 10 + index + 1;
                                    const adjustedId = id;

                                    return (
                                        <PlanetsBlock 
                                            name={planet.name} 
                                            id={adjustedId} 
                                            key={adjustedId} 
                                        />
                                    );
                                })
                            }
                        </div>
                        <div className='Planet-pagination'>
                            <button onClick={handlePrevious} disabled={props.PlanetPage.currentPlanetPage === 1}>Previous</button>
                            <button onClick={handleNext} disabled={props.PlanetPage.currentPlanetPage === props.PlanetPage.totalPlanetPages}>Next</button>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Planets;
