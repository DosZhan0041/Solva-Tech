import { Link, useNavigate } from 'react-router-dom';
import './Register.css'
import { SubmitHandler, useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

interface FormValues {
    email: string;
    password: string
}

let Register: React.FC = ()=>{
    let navigate = useNavigate()
    const [eyes, setEyes] = useState(false);
    const {register, handleSubmit, formState: {errors}} = useForm<FormValues>();
    const [formValues, setFormValues] = useState<FormValues>({
        email: '',
        password: ''
    });

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        const newUser = {
            email: data.email,
            password: data.password
        };

            fetch('http://localhost:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newUser)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Ошибка HTTP, статус " + response.status);
                }
                return response.json();
            })
            .then(data => {
                localStorage.setItem('user', JSON.stringify({...data.user, accessToken: data.accessToken}))
                navigate("/");
            })
            .catch(error => {
                console.error("Произошла ошибка:", error);
            })
    };


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = e.target;
        setFormValues((prevValues)=>({
            ...prevValues,
            [name]: value
        }));
    }

    return(
         <div className='register'>
            <h1>Welcome to the website!</h1>
            <img src='/img/icon-login.png'></img>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input placeholder='email' type='email' {...register("email", {required: 'Введите email', pattern: {value: /^[a-zA-Z0-9._%+-]{6,}@\S+\.\S+$/, message: "Часть email до @ должна содержать минимум 6 символов" }})} value={formValues.email} onChange={handleInputChange}/>
                {errors.email && <p className='error'>{errors.email.message}</p>}
                <div className='password'>
                    <input  placeholder='password' type={eyes ? "text" : "password"} {...register("password", {required:'Введите пароль', minLength:{value: 6, message: 'Пароль должен содержать не менее 6 символов'}})} value={formValues.password} onChange={handleInputChange}/>
                    {errors.password && <p className='error'>{errors.password.message}</p>}
                    {
                        eyes ? (
                            <button className='eyes' onClick={()=>(setEyes(false))}><FaEye /></button>
                        )
                        :
                        (
                            <button className='eyes' onClick={()=>(setEyes(true))}><FaEyeSlash /></button>
                        )

                    
                    }
                </div>
                <button type='submit'>Зарегистрироваться</button>
            </form>
            <Link to='/login'>У меня есть аккаунт!</Link>
         </div>
    )
}
export default Register;