import React from 'react';
import styles from "./styles.module.css";
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Signup = () => {

    const [data, setData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({currentTarget: input}) => {
        setData({...data, [input.name]:input.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const url ='http://localhost:4000/api/users';
            const {data:res} = await axios.post(url,data);
            window.alert('Account Created successfully');
            navigate('/login')
            console.log(res.message);
        }catch(error){
           if(error.response && 
            error.response.status >= 400 &&
            error.response.status <=500
            ){
                setError(error.response.data.message);
            }
        }
    }
  return (
    <div className={styles.signup_container}>
        <div className={styles.signup_form_container}>
            <div className={styles.left}>
                <h1>Welcome Back</h1>
                <Link to='/login'>
                <button type='button' className={styles.white_btn}>
                    Sign In
                </button>
                </Link>
            </div>
            <div className={styles.right}>
                <form className={styles.form_container} onSubmit={handleSubmit}>
                    <h1>Create Account</h1>
                    <input
                        type='text'
                        placeholder='FirstName'
                        name='first_name'
                        onChange={handleChange}
                        value={data.first_name}
                        required
                        className={styles.input}
                    />
                    <input
                        type='text'
                        placeholder='LastName'
                        name='last_name'
                        onChange={handleChange}
                        value={data.last_name}
                        required
                        className={styles.input}
                    />
                    <input
                        type='emial'
                        placeholder='E-Mail'
                        name='email'
                        onChange={handleChange}
                        value={data.email}
                        required
                        className={styles.input}
                    />
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        onChange={handleChange}
                        value={data.password}
                        required
                        className={styles.input}
                    />
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <button type='submit' className={styles.green_btn}>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default Signup;