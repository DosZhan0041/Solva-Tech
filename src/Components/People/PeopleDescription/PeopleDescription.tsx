import { useForm } from 'react-hook-form';
import './PeopleDescription.css';
import React from 'react';

interface Person {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    gender: string;
    birth_year: string;
    image: string
}

interface authUserType{
    email: string,
    password: string
}

interface PeoplePageType{
    currentPeoplePage: number,
    isLoad: boolean,
    people: Person[],
    totalPeoplePages: number
}

interface PropsType {
    PeoplePage: PeoplePageType,
    authUser: authUserType,
    editMode: boolean,
    onEdit:()=>void;
    onSave: (data: any)=>void;
    onePerson: Person
}

let PeopleDescription: React.FC<PropsType> = (props) => {

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            name: props.onePerson.name,
            height: props.onePerson.height,
            mass: props.onePerson.mass,
            hair_color: props.onePerson.hair_color,
            skin_color: props.onePerson.skin_color,
            eye_color: props.onePerson.eye_color,
            gender: props.onePerson.gender,
            birth: props.onePerson.birth_year
        },
    });

    const onSubmit = (data: any) => {
        props.onSave(data); 
    }

    return (
        <div className='PeopleDescription'>
            <div className='peopleDescLeft'>
                <img 
                    src={props.onePerson.image ? props.onePerson.image : 'https://tradm-r69.gosweb.gosuslugi.ru/netcat_files/9/260/U0WAp4LnwgM_30.jpg'}
                    alt={props.onePerson.name}
                />
            </div>
            {
                props.editMode ? (
                    <div className='peopleDescRight people-input'>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input 
                                placeholder={props.onePerson.name} 
                                defaultValue={props.onePerson.name} 
                                type="text" 
                                {...register('name', { required: "Name is required" })} 
                            />
                            {errors.name && <p className="error">{errors.name.message}</p>}
                            
                            <input 
                                placeholder={props.onePerson.height} 
                                defaultValue={props.onePerson.height} 
                                type="number" 
                                {...register('height', { required: "Height is required" })} 
                            />
                            {errors.height && <p className="error">{errors.height.message}</p>}
                            
                            <input 
                                placeholder={props.onePerson.mass} 
                                defaultValue={props.onePerson.mass} 
                                type="number" 
                                {...register('mass', { required: "Mass is required" })} 
                            />
                            {errors.mass && <p className="error">{errors.mass.message}</p>}
                            
                            <input 
                                placeholder={props.onePerson.hair_color} 
                                defaultValue={props.onePerson.hair_color} 
                                type="text" 
                                {...register('hair_color', { required: "Hair color is required" })} 
                            />
                            {errors.hair_color && <p className="error">{errors.hair_color.message}</p>}
                            
                            <input 
                                placeholder={props.onePerson.skin_color} 
                                defaultValue={props.onePerson.skin_color} 
                                type="text" 
                                {...register('skin_color', { required: "Skin color is required" })} 
                            />
                            {errors.skin_color && <p className="error">{errors.skin_color.message}</p>}
                            
                            <input 
                                placeholder={props.onePerson.eye_color} 
                                defaultValue={props.onePerson.eye_color} 
                                type="text" 
                                {...register('eye_color', { required: "Eye color is required" })} 
                            />
                            {errors.eye_color && <p className="error">{errors.eye_color.message}</p>}
                            
                            <input 
                                placeholder={props.onePerson.gender} 
                                defaultValue={props.onePerson.gender} 
                                type="text" 
                                {...register('gender', { required: "Gender is required" })} 
                            />
                            {errors.gender && <p className="error">{errors.gender.message}</p>}
                            
                            <input 
                                placeholder={props.onePerson.birth_year} 
                                defaultValue={props.onePerson.birth_year} 
                                type="text" 
                                {...register('birth', { required: "Birth year is required" })} 
                            />
                            {errors.birth && <p className="error">{errors.birth.message}</p>}
                            
                            <button type="submit">Save</button>
                        </form>
                    </div>
                ) : (
                    <div className='peopleDescRight'>
                        <h3>full-name: {props.onePerson.name}</h3>
                        <p>height: {props.onePerson.height} cm</p>
                        <p>mass: {props.onePerson.mass} kg</p>
                        <p>hair-color: {props.onePerson.hair_color}</p>
                        <p>skin-color: {props.onePerson.skin_color}</p>
                        <p>eye-color: {props.onePerson.eye_color}</p>
                        <p>gender: {props.onePerson.gender}</p>
                        <p>birth: {props.onePerson.birth_year}</p>
                        <button onClick={props.onEdit}>Edit</button>
                    </div>
                )
            }
        </div>
    )
}

export default PeopleDescription;
