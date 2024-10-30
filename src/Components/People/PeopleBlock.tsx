import { useNavigate } from 'react-router-dom';
import './PeopleBlock.css'
import React from 'react';

interface PersonType{
    id: number;
    image: string,
    name: string
}

let PeopleBlock: React.FC<PersonType> = (props) =>{
    let navigate = useNavigate()
    let redirect = (id: number) => {    
        navigate(`/people/${id}`)
    }
    return(
        <div className='PeopleBlock'>
            <div className='People-photo'>
                <img src={props.image}></img>
            </div>
            <div className='People-name'>
                <h3>{props.name}</h3>
            </div>
            <button onClick={()=>redirect(props.id)}>More details</button>
        </div>
    )
}
export default PeopleBlock;