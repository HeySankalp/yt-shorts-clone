import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react';
import { auth } from '../firebase';
import { useAlert } from 'react-alert';
import  Router  from 'next/router';

const Login = () => {
 
    const Alert = useAlert();
    const [inputData, setInputData] = useState({});

    const  inputChange = (e,identifier)=>{
        setInputData((curInputValues)=>{
            return {
                ...curInputValues,
                [identifier] : e.target.value
            }
        })
    }

    const loginHandler = ()=>{
        auth
        .signInWithEmailAndPassword(inputData.email,inputData.password)
        .then(()=>{
            Alert.success('Logged In');
            Router.replace('/')
        })
        .catch(()=>{
            Alert.error('Re-check credentials')
            setInputData({})
        })
    }

    return (
        <div className='loginSignupMainCon' >
            <div className='loginSignupLogoCon'>
                <Link href={'/'} >
                    <a>
                        <Image src='/shorts-logo.png' width={75} height={75} />
                    </a>
                </Link>
                <h2 className='loginSignupLogoText'>Login</h2>
            </div>

            <div className='loginSignupInputCon'>
                <input className='loginSignupInput' value={inputData.email} placeholder='Email' type="email" onChange={(e)=>inputChange(e,'email')} />
                <input className='loginSignupInput' value={inputData.password} placeholder='Password' type="password" onChange={(e)=>inputChange(e,'password')} />
                <button className='loginSignupBtn' onClick={loginHandler}>Login</button>
            </div>
            <h3>Don't have an account? <Link href={'/Signup'}><a className='text-red-500 font-bold'>Signup</a></Link></h3>
        </div>
    )
}

export default Login