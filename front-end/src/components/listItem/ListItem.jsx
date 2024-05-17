import { Add, PlayArrow, ThumbDownAltOutlined, ThumbUpAltOutlined } from '@material-ui/icons';
import './listItem.scss';
import { useEffect, useState } from 'react';
import VideoPlayer from "../videoPlayer/VideoPlayer";
import { makeRequest } from '../../axios';
import { Link } from 'react-router-dom';

const ListItem = ({index, item}) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // The below method would mean additional requests to the backend.. 
    // Already changed the backend to provide the infos when we get lists
    // leaving these here for learning purposes / alternate ways even if this bad
    // const [movie, setMovie] = useState({});
    // const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjAwNDNkZGE0ZmE3MjJkYWI5NTc3YiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxNTU4MTAwMCwiZXhwIjoxNzE2MDEzMDAwfQ.TeCfrxHO1sInG2M5BJxmpIZ-sejprim42_RO_8GteSM";
    // useEffect(() => {
    //     const getMovie = async () => {
    //         try {
    //             const res = await makeRequest.get("/movies/find/" + item._id, {
    //                 headers: {
    //                   accessToken: "Bearer " + accessToken,
    //                   }
    //                 }
    //             );
    //             setMovie(res.data);
    //             // replace item.desc and all other ones with movie.desc instead
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }

    //     getMovie();

    // }, [item]);

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
        {/* <img 
            src="https://i.pinimg.com/564x/5b/5d/09/5b5d09fe42668a01a0db82c80fe4160e.jpg" 
            alt="" 
        />  */}
        {isHovered ? (<>
            {/* <video src={trailer} autoPlay={true} loop/> */}
            {/* <div className="iframe-container">
                <iframe 
                    src={trailer} 
                    frameborder="0"
                    allow='autoplay; encrypted-media'
                />
            </div> */}
            <VideoPlayer trailer={item.trailer}/>
            <div className="itemInfo">
                <div className="icons">
                    <Link to={{ pathname: "/watch", movie: item }}>
                        <PlayArrow className='icon'/>
                    </Link>
                    <Add className='icon'/>
                    <ThumbUpAltOutlined className='icon'/>
                    <ThumbDownAltOutlined className='icon'/>
                </div>
                <div className="itemInfoTop">
                    <span>NA in Backend</span>
                    <span className='limit'>{item.ageLimit}</span>
                    <span>{item.year}</span>
                </div>
                <div className="desc">
                    {item.desc}
                </div>
                <div className="genre">{item.genre}</div>
            </div>
        </>
        ) : <img 
                src={item.img}
                alt="" 
            />
        } 
    </div>
  )
}

export default ListItem