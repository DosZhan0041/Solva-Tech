import { useNavigate } from 'react-router-dom';
import './StarshipBlock.css'

let StarshipBlock = (props) =>{
    let navigate = useNavigate()
    let redirect = (id) => {    
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