import React from 'react'
import Image from 'next/image'

const Footer = ({shortdata}) => {
    return (
        <div className='footerCon'>
            <h2 className='footerDescription' >{shortdata.description}</h2>
            <div className='footerSubCon' >
                <div className='footerSubConLeft' >
                    <div className='footerPic'>
                        <Image src={shortdata.photoUrl} width={100} height={100} alt="pd" />
                    </div>
                    <h2 className='footerUser'>{shortdata.channelName}</h2>
                    <button className='footerSubBtn' >SUBSCRIBE</button>
                </div>
                <div className='footerSubConRight'>
                    <Image src={shortdata.photoUrl} width={100} height={100} alt="dp" />
                    <div className='footerSubConGif'>
                        <Image src='https://i.giphy.com/media/XaejLonqk19jDugJbq/giphy.webp' width={100} height={100} alt="dp" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer