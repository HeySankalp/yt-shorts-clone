import Image from 'next/image'
import Router from 'next/router';
import React from 'react';
import { FiUpload } from 'react-icons/fi'
import { auth } from '../firebase';
import { useAlert } from 'react-alert';

const Postheader = ({ authenticated }) => {

  const Alert = useAlert();

  const onClickHanlder = () => {
    if (!authenticated) {
      Router.push('/Login')
    } else {
      Alert.success('Logged Out')
      auth.signOut();

    }
  }

  return (
    <div className='postHeaderMainCon'>
      <div className='postHeaderLogoCon'>
        <Image src='/shorts-logo.png' width={50} height={50} />
        <h2 className='postHeaderLogoText'>Shorts</h2>
      </div>
      <div className='postHeaderBtnCon'>
        {authenticated &&
          <button className='postHeaderUploadBtn' onClick={() => { Router.push('/Upload') }}><FiUpload /></button>
        }
        &nbsp;&nbsp;&nbsp;
        <button className='postHeaderBtn' onClick={onClickHanlder} >{authenticated ? 'Logout' : 'Login'}</button>
      </div>
    </div>
  )
}

export default Postheader