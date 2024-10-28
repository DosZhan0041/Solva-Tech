import { useNavigate } from 'react-router-dom';
import './PeopleBlock.css'

let PeopleBlock = (props) =>{
    let navigate = useNavigate()
    let redirect = (id) => {    
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