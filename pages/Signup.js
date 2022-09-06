import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { auth, storage } from '../firebase';
import { useAlert } from 'react-alert';
import Router from 'next/router';
import { IoMdCloseCircle } from 'react-icons/io'
import { v4 as v4 } from 'uuid'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import BeatLoader from "react-spinners/BeatLoader";



const Signup = () => {

    const Alert = useAlert();
    const [inputData, setInputData] = useState({})
    const [file, setFile] = useState(null);
    const [isSigningup, setIsSigningup] = useState(false);

    const inputChangeHandler = (e, inputIdentifier) => {
        setInputData((curInputValues) => {
            return {
                ...curInputValues,
                [inputIdentifier]: e.target.value
            };
        });
    }

    const signupHandler = () => {
        //if there is a file then upload a file and signup
        if (file) {
            setIsSigningup(true);
            const fileName = v4();
            const storageRef = ref(storage, `channelPhoto/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on('state_changed',
                (snapshot) => { },
                (error) => {
                    Alert.error('Storage error occured')
                    setIsSigningup(false)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref)
                        .then((url) => {
                            auth
                                .createUserWithEmailAndPassword(inputData.email, inputData.password)
                                .then((authUser) => {
                                    authUser.user.updateProfile({
                                        displayName: inputData.fullName,
                                        photoURL: url
                                    });
                                    setIsSigningup(false)
                                    Alert.success("Signed Up")
                                    Router.replace('/');
                                }).catch(() => {
                                    Alert.show('Re-check input creds!')
                                    setIsSigningup(false)
                                })
                        })
                        .catch(() => {
                            Alert.error('Url error occured')
                            setIsSigningup(false)
                        })
                })
                //is there is no file just signup with randon avatar
        } else {
            setIsSigningup(true);
            auth
                .createUserWithEmailAndPassword(inputData.email, inputData.password)
                .then((authUser) => {
                    authUser.user.updateProfile({
                        displayName: inputData.fullName,
                        photoURL: '/yt-avatar.png'
                    });
                    setIsSigningup(false);
                    Alert.success("Signed Up")
                    Router.replace('/');
                }).catch(() => {
                    Alert.show('Re-check input creds!')
                    setIsSigningup(false)
                })
        }
    }

    return (
        <div className='loginSignupMainCon' >
            <div className='loginSignupLogoCon'>
                <Link href={'/'} >
                    <a>
                        <Image src='/shorts-logo.png' width={75} height={75} alt='' />
                    </a>
                </Link>
                <h2 className='loginSignupLogoText'>Signup</h2>
            </div>

            <div className='loginSignupInputCon'>
                <input className='loginSignupInput' value={inputData.fullName} name='fullname' type='text' placeholder='Full Name' onChange={(e) => inputChangeHandler(e, 'fullName')} />
                <input className='loginSignupInput' value={inputData.email} name='email' type='email' placeholder='Email' onChange={(e) => inputChangeHandler(e, 'email')} />
                <input className='loginSignupInput' value={inputData.password} name='password' type='password' placeholder='Password' onChange={(e) => inputChangeHandler(e, 'password')} />
                <label className='loginSignupPhoto' htmlFor="userPic">
                    {
                        file ?
                            <>1 file selected&nbsp;<IoMdCloseCircle onClick={() => { setFile(null) }} size={25} color='red' /></>
                            : 'Add photo (Optional)'
                    }
                </label>
                <input disabled={file} style={{ display: 'none' }} id='userPic' type="file" accept='.png, .jpeg, .jpg, .jfif' onChange={(e) => setFile(e.target.files[0])} />
                <button className='loginSignupBtn' onClick={signupHandler}>
                   {
                    isSigningup? 
                    <BeatLoader  color='red' loading={true}  size={15} />:
                    'SignUp'
                   } 
                    </button>
            </div>
            <h3>Already have an account? <Link href={'/Login'}><a className='text-red-500 font-bold'>Login</a></Link></h3>
        </div>
    )
}

export default Signup