import { useForm } from 'react-hook-form';
import './StarshipDesc.css';

let StarshipDescription = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: props.oneStarship.name,
            model: props.oneStarship.model,
            price: props.oneStarship.cost_in_credits,
            length: props.oneStarship.length,
            passengers: props.oneStarship.passengers,
            class: props.oneStarship.starship_class,
            speed: props.oneStarship.max_atmosphering_speed,
            crew: props.oneStarship.crew
        },
    });

    const onSubmit = (data) => {
        props.onSave(data); 
    }

    return (
        <div className='StarshipDescription'>
            {
                props.editMode ? (
                    <div className='StarshipDescRight Starship-input'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input 
                                placeholder={props.oneStarship.name} 
                                defaultValue={props.oneStarship.name} 
                                type="text" 
                                {...register('name', { required: "Name is required" })} 
                            />
                            {errors.name && <p className="error">{errors.name.message}</p>}
                            
                            <input 
                                placeholder={props.oneStarship.model} 
                                defaultValue={props.oneStarship.model} 
                                type="text" 
                                {...register('model', { required: "model is required" })} 
                            />
                            {errors.model && <p className="error">{errors.model.message}</p>}
                            
                            <input 
                                placeholder={props.oneStarship.cost_in_credits} 
                                defaultValue={props.oneStarship.cost_in_credits} 
                                type="number" 
                                {...register('price', { required: "price is required" })} 
                            />
                            {errors.price && <p className="error">{errors.price.message}</p>}
                            
                            <input 
                                placeholder={props.oneStarship.length} 
                                defaultValue={props.oneStarship.length} 
                                type="number" 
                                {...register('length', { required: "length color is required" })} 
                            />
                            {errors.length && <p className="error">{errors.length.message}</p>}
                            
                            <input 
                                placeholder={props.oneStarship.passengers} 
                                defaultValue={props.oneStarship.passengers} 
                                type="number" 
                                {...register('passengers', { required: "passengers color is required" })} 
                            />
                            {errors.passengers && <p className="error">{errors.passengers.message}</p>}
                            
                            <input 
                                placeholder={props.oneStarship.starship_class} 
                                defaultValue={props.oneStarship.starship_class} 
                                type="text" 
                                {...register('class', { required: "class is required" })} 
                            />
                            {errors.class && <p className="error">{errors.class.message}</p>}
                            
                            <input 
                                placeholder={props.oneStarship.max_atmosphering_speed} 
                                defaultValue={props.oneStarship.max_atmosphering_speed} 
                                type="number" 
                                {...register('speed', { required: "speed is required" })} 
                            />
                            {errors.speed && <p className="error">{errors.speed.message}</p>}
                            
                            <input 
                                placeholder={props.oneStarship.crew} 
                                defaultValue={props.oneStarship.crew} 
                                type="text" 
                                {...register('crew', { required: "crew year is required" })} 
                            />
                            {errors.crew && <p className="error">{errors.crew.message}</p>}
                            
                            <button type="submit">Save</button>
                        </form>
                    </div>
                ) : (
                    <div className='peopleDescRight'>
                        <h3>name: {props.oneStarship.name}</h3>
                        <p>model: {props.oneStarship.model}</p>
                        <p>price: {props.oneStarship.cost_in_credits}</p>
                        <p>length: {props.oneStarship.length}</p>
                        <p>passengers: {props.oneStarship.passengers}</p>
                        <p>class: {props.oneStarship.starship_class}</p>
                        <p>speed: {props.oneStarship.max_atmosphering_speed}</p>
                        <p>crew: {props.oneStarship.crew}</p>
                        <button onClick={props.onEdit}>Edit</button>
                    </div>
                )
            }
        </div>
    )
}

export default StarshipDescription;
