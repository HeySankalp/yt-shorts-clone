import React, { useEffect, useRef, useState } from 'react'
import Footer from './Footer';
import Sidebar from './Sidebar';
import {BsFillPlayCircleFill} from 'react-icons/bs'

const Videoitem = ({ shortdata,id }) => {

    const [playing, setplaying] = useState(false);

    const vidRef = useRef('null');

    const onVideoPress = () => {
        if (!playing) {
            vidRef.current.play();
            setplaying(true);
        } else {
            vidRef.current.pause();
            setplaying(false);
        }
    }

    const handleScroll = ()=>{
        if(playing){
            vidRef.current.pause();
            setplaying(false);
        }
    }



    return (
        <div className='  videoItemCon'  >
            {
                !playing&&
                <BsFillPlayCircleFill color='white' size={50} style={{position:'absolute',top:'45%', right:'40%'}}/>
            }
            <video loop onTouchMove={handleScroll} className='videoplayer' onClick={onVideoPress}
                ref={vidRef}
                src={shortdata.shortUrl}
            />
        <Sidebar vidUrl={shortdata.shortUrl} id={id} shortdata={shortdata} />
            <Footer shortdata={shortdata} />
        </div>
    )
}

export default Videoitem