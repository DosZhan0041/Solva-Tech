import { useNavigate } from 'react-router-dom';
import './PlanetsBlock.css'
import React, { FC } from 'react';

interface PlanetType{
    id: number;
    name: string,
}

let PlanetBlock:React.FC<PlanetType> = (props) =>{
    let navigate = useNavigate()
    let redirect = (id: number) => {    
        navigate(`/planet/${id}`)
    }
    return(
        <div className='PlanetBlock'>
            <div className='Planet-name'>
                <h3>{props.name}</h3>
            </div>
            <button onClick={()=>redirect(props.id)}>More details</button>
        </div>
    )
}
export default PlanetBlock;