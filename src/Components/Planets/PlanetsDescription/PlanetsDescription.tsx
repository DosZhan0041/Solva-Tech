import { useForm } from 'react-hook-form';
import './PlanetsDescription.css';
import React from 'react';


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
    onePlanet: Planet,
    editMode: boolean,
    onEdit:()=>void;
    onSave: (data: any)=>void;
}

let PlanetDescription: React.FC<propsType> = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: props.onePlanet.name,
            rotation: props.onePlanet.rotation_period,
            orbital: props.onePlanet.orbital_period,
            diameter: props.onePlanet.diameter,
            climate: props.onePlanet.climate,
            gravity: props.onePlanet.gravity,
            terrain: props.onePlanet.terrain,
            population: props.onePlanet.population
        },
    });

    const onSubmit = (data: any) => {
        props.onSave(data); 
    }

    return (
        <div className='PlanetDescription'>
            {
                props.editMode ? (
                    <div className='PlanetDescRight Planet-input'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input 
                                placeholder={props.onePlanet.name} 
                                defaultValue={props.onePlanet.name} 
                                type="text" 
                                {...register('name', { required: "Name is required" })} 
                            />
                            {errors.name && <p className="error">{errors.name.message}</p>}
                            
                            <input 
                                placeholder={props.onePlanet.rotation_period} 
                                defaultValue={props.onePlanet.rotation_period} 
                                type="number" 
                                {...register('rotation', { required: "rotation is required" })} 
                            />
                            {errors.rotation && <p className="error">{errors.rotation.message}</p>}
                            
                            <input 
                                placeholder={props.onePlanet.orbital_period} 
                                defaultValue={props.onePlanet.orbital_period} 
                                type="number" 
                                {...register('orbital', { required: "orbital is required" })} 
                            />
                            {errors.orbital && <p className="error">{errors.orbital.message}</p>}
                            
                            <input 
                                placeholder={props.onePlanet.diameter} 
                                defaultValue={props.onePlanet.diameter} 
                                type="number" 
                                {...register('diameter', { required: "diameter color is required" })} 
                            />
                            {errors.diameter && <p className="error">{errors.diameter.message}</p>}
                            
                            <input 
                                placeholder={props.onePlanet.climate} 
                                defaultValue={props.onePlanet.climate} 
                                type="text" 
                                {...register('climate', { required: "climate color is required" })} 
                            />
                            {errors.climate && <p className="error">{errors.climate.message}</p>}
                            
                            <input 
                                placeholder={props.onePlanet.gravity} 
                                defaultValue={props.onePlanet.gravity} 
                                type="text" 
                                {...register('gravity', { required: "gravity is required" })} 
                            />
                            {errors.gravity && <p className="error">{errors.gravity.message}</p>}
                            
                            <input 
                                placeholder={props.onePlanet.terrain} 
                                defaultValue={props.onePlanet.terrain} 
                                type="text" 
                                {...register('terrain', { required: "terrain is required" })} 
                            />
                            {errors.terrain && <p className="error">{errors.terrain.message}</p>}
                            
                            <input 
                                placeholder={props.onePlanet.population} 
                                defaultValue={props.onePlanet.population} 
                                type="number" 
                                {...register('population', { required: "population year is required" })} 
                            />
                            {errors.population && <p className="error">{errors.population.message}</p>}
                            
                            <button type="submit">Save</button>
                        </form>
                    </div>
                ) : (
                    <div className='peopleDescRight'>
                        <h3>name: {props.onePlanet.name}</h3>
                        <p>rotation: {props.onePlanet.rotation_period}</p>
                        <p>orbital: {props.onePlanet.orbital_period}</p>
                        <p>diameter: {props.onePlanet.diameter}</p>
                        <p>climate: {props.onePlanet.climate}</p>
                        <p>gravity: {props.onePlanet.gravity}</p>
                        <p>terrain: {props.onePlanet.terrain}</p>
                        <p>population: {props.onePlanet.population}</p>
                        <button onClick={props.onEdit}>Edit</button>
                    </div>
                )
            }
        </div>
    )
}

export default PlanetDescription;
