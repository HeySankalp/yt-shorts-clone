import Link from 'next/link'
import Image from 'next/image'
import Router from 'next/router';

import React, { useEffect, useState } from 'react';
import { Line } from 'rc-progress';
import { v4 as v4 } from 'uuid';
import { IoMdCloseCircle } from 'react-icons/io'
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { useAlert } from 'react-alert';
import firebase from "firebase/compat/app";

const Upload = () => {
    const alert = useAlert();
    const [isUploading, setIsUploading] = useState(false)
    const [progress, setProgrss] = useState(0);
    const [videoFile, setVideoFile] = useState(null);
    const [description, setDescription] = useState('');
    const [authUser, setAuthUser] = useState();

    useEffect(() => {
        setAuthUser({
            userName: auth?.currentUser?.displayName,
            photoUrl: auth?.currentUser?.photoURL
        })
    }, [])



    const postVideoHandler = () => {
        if (videoFile.size / (1024 * 1024) > 100) {
            alert.error('File exceeds 100 MB')
            return;
        }
        setIsUploading(true)
        const fileName = v4(); + videoFile.name;
        const storageRef = ref(storage, `shorts/${fileName}`)
        const uploadTask = uploadBytesResumable(storageRef, videoFile)
        uploadTask.on('state_changed',
            (snapshot) => {
                const uploaded = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgrss(uploaded);
            },
            (error) => {
                alert.error('Some storage error!')
                console.log(error.serverResponse);
                return;
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                    await db.collection('shorts').add({
                        channelName: authUser.userName,
                        description: description,
                        photoUrl: authUser.photoUrl,
                        shortUrl: url,
                        likes: [],
                        dislikes: [],
                        owner : auth.currentUser.uid,
                        timeStamps: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        setDescription('')
                        setVideoFile(null)
                        setIsUploading(false);
                        Router.replace('/');
                    }).catch((error) => {
                        alert.error('Some database errro!');
                        console.log(error);
                        return;
                    });
                });
            });
    }

    return (
        <div className='uploadMainCon' >
            <div className='uploadLogoCon'>
                <Link href={'/'} >
                    <a>
                        <Image src='/shorts-logo.png' width={75} height={75} />
                    </a>
                </Link>
                <h2 className='uploadLogoText'>Upload short</h2>
            </div>

            <div className='uploadInputCon'>
                <input className='uploadInput' value={description} placeholder='Type description' type="text" onChange={(e) => { setDescription(e.target.value) }} />
                <input disabled={isUploading || videoFile} style={{ 'display': 'none' }} id='selectVideo' type="file" accept='video/*' onChange={(e) => setVideoFile(e.target.files[0])} />
                <div className='uploadBtnGrp' >
                    <label  htmlFor='selectVideo' className='uploadChooseBtn' >{videoFile ? 'Selected' : 'Choose file'}</label>
                    &nbsp;&nbsp;
                    <button disabled={isUploading || !videoFile} className='uploadBtn' onClick={postVideoHandler}>Upload</button>
                </div>
                <span className='uploadConVideoPrev' >
                    {videoFile ?
                        <>
                            1 video selected &nbsp;
                            <IoMdCloseCircle color='red' onClick={() => { setVideoFile(null) }} size={25} />
                        </> :
                        <>
                            No video selected
                        </>
                    }
                </span>
                <Line style={{ visibility: isUploading ? 'visible' : 'hidden' }} percent={progress} strokeWidth={2} strokeColor="#ff0000" />

            </div>
        </div>
    )
}

// export async function getServerSideProps(context) {
//     const auth = require('../firebase')
//     const currentUser = await auth?.currentUser
//     const currentUserData = JSON.stringify(currentUser);
//     return {
//       props: {currentUser : currentUserData}, // will be passed to the page component as props
//     }
//   }

export default Upload
