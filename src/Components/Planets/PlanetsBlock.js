import { useNavigate } from 'react-router-dom';
import './PlanetsBlock.css'

let PlanetBlock = (props) =>{
    let navigate = useNavigate()
    let redirect = (id) => {    
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