import React, { useState } from 'react'
import { IoIosShareAlt } from 'react-icons/io'
import { HiThumbDown, HiThumbUp } from 'react-icons/hi'
import { MdMoreHoriz, MdComment,MdDelete } from 'react-icons/md'
import { FiCamera } from 'react-icons/fi'
import { auth, db } from '../firebase'
import { useAlert } from 'react-alert';
import 'firebase/compat/storage'
import firebase from "firebase/compat/app";


const Sidebar = ({shortdata,id, vidUrl}) => {

    const alert = useAlert();
    const [isDisliked, setIsDisliked] = useState(false)
    const [isLiked, setIsLiked] = useState(false)

const handleLike = async()=>{


    if(!isLiked){
        setIsLiked(true)
     }else{
        setIsLiked(false)
     }
     setIsDisliked(false)
}

const handleDislike = ()=>{
 if(!isDisliked){
    setIsDisliked(true)
 }else{
    setIsDisliked(false)
 }
 setIsLiked(false)
}

const deleteShort = ()=>{
const urlRef = firebase.storage().refFromURL(vidUrl)
urlRef.delete().then(()=>{
    alert.info('Short deleted');
}).catch(()=>{
    alert.error('delete error occured')
})

db.collection('shorts').doc(id).delete()
.then(()=>{
    console.log("deleted from database");
})
.catch(()=>{
    console.log("error white deleting from db");
})
}



    return (
        <div className='sideBarCon' >
            <div className="sidebarUpper">
                <FiCamera
                className='sidebarIco'
                    size={28}
                />
            </div>
            <div className="sidebarLower">
                <div className='sidebarLowerItemCon'>
                    <MdMoreHoriz
                    className='sidebarIco'
                        size={31}
                    />
                </div>
                { shortdata.owner===auth?.currentUser?.uid&&
                    <div className='sidebarLowerItemCon'>
                    <MdDelete
                    onClick={deleteShort}
                    className='sidebarIco'
                    size={31}
                    />
                </div>
                }
                <div className='sidebarLowerItemCon'>
                    <HiThumbUp
                    color={isLiked ? 'rgb(68, 172, 214)' : 'white'}
                    onClick={handleLike}
                    className='sidebarIco'
                        size={31}
                    />
                    <span className='sidebarLowerSpan'>{isLiked?shortdata.likes.length+1:shortdata.likes.length}</span>
                </div>
                <div className='sidebarLowerItemCon'>
                    <HiThumbDown
                    color={isDisliked ? 'rgb(68, 172, 214)' : 'white'}
                    
                    onClick={handleDislike}
                    className='sidebarIco'
                        size={31}
                    />
                    <span className='sidebarLowerSpan'>Dislike</span>
                </div>
                <div className='sidebarLowerItemCon'>
                    <MdComment
                    className='sidebarIco'
                        size={31}
                    />
                    <span className='sidebarLowerSpan' >Comment</span>
                </div>
                <div className='sidebarLowerItemCon'>
                    <IoIosShareAlt
                    className='sidebarIco'
                        size={31}
                    />
                    <span className='sidebarLowerSpan'>Share</span>
                </div>

            </div>
        </div>
    )
}

export default Sidebar