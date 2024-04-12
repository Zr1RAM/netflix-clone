import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons';
import './listItem.scss';
import { useState } from 'react';
import YouTube from 'react-youtube';

const ListItem = ({index}) => {
    const [isHovered, setIsHovered] = useState(false);
    //const trailer = 'https://www.youtube.com/watch?v=HTLPULt0eJ4&pp=ygUTc2NhcnkgbW92aWUgdHJhaWxlcg%3D%3D';
    const trailer = 'HTLPULt0eJ4';

  return (
    <div 
        className='listItem' 
        style={{left: isHovered && (index * 225) - 50 + (index * 2.5)}}
        onMouseEnter={()=> setIsHovered(true)} 
        onMouseLeave={()=>setIsHovered(false)}
    >
        {/* {!isHovered && (
            <img 
            src="https://i.pinimg.com/564x/5b/5d/09/5b5d09fe42668a01a0db82c80fe4160e.jpg" 
            alt="" 
        />
        )} */}
        <img 
            src="https://i.pinimg.com/564x/5b/5d/09/5b5d09fe42668a01a0db82c80fe4160e.jpg" 
            alt="" 
        /> 
        {isHovered && (<>
            {/* <video src={trailer} autoPlay={true} loop/> */}
            {/* <div className="iframe-container">
                <iframe 
                    src={trailer} 
                    frameborder="0"
                    allow='autoplay; encrypted-media'
                />
            </div> */}
            {/* <div className="iframe-container">
                <YouTube 
                    videoId={trailer}
                    opts={{
                        playerVars: {
                            autoplay: 1,
                        },
                    }}
                />
            </div> */}
            <div className="itemInfo">
                <div className="icons">
                    <PlayArrow className='icon'/>
                    <Add className='icon'/>
                    <ThumbUpAltOutlined className='icon'/>
                    <ThumbDownAltOutlined className='icon'/>
                </div>
                <div className="itemInfoTop">
                    <span>1 hour 34 mins</span>
                    <span className='limit'>+18</span>
                    <span>1987</span>
                </div>
                <div className="desc">
                    lets write some random sentence. Maybe like just right here.
                </div>
                <div className="genre">Comedy</div>
            </div>
        </>
        )}
    </div>
  )
}

export default ListItem