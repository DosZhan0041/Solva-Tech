import { useNavigate } from 'react-router-dom';
import './StarshipBlock.css'
import React from 'react';

interface StarshipType{
    id: any ;
    name: string,
}

let StarshipBlock: React.FC<StarshipType> = (props) =>{
    console.log(props);
    
    let navigate = useNavigate()
    let redirect = (id:number ) => {    
        navigate(`/starship/${id}`)
    }
    return(
        <div className='StarshipBlock'>
            <div className='Starship-name'>
                <h3>{props.name}</h3>
            </div>
            <button onClick={()=>redirect(props.id)}>More details</button>
        </div>
    )
}
export default StarshipBlock;