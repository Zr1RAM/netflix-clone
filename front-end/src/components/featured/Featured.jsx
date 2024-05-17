import { InfoOutlined, PlayArrow } from '@material-ui/icons'
import './featured.scss'
import { useEffect, useState } from 'react'
import { makeRequest } from '../../axios';

const Featured = ({type}) => {
    //console.log(type);
    const [content, setContent] = useState({});

    useEffect(() => {
        const getFeaturedMovie = async () => {
            try {
                const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjAwNDNkZGE0ZmE3MjJkYWI5NTc3YiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTcxNTU4MTAwMCwiZXhwIjoxNzE2MDEzMDAwfQ.TeCfrxHO1sInG2M5BJxmpIZ-sejprim42_RO_8GteSM";
                const res = await makeRequest(`/movies/random?type=${type}` , {
                    headers: {
                        accessToken: "Bearer " + accessToken,
                    }
                });
                //console.log(res.data[0]);
                setContent(res.data[0]);
                //console.log(content);
            } catch (error) {
                console.log(error);
            }
        };

        getFeaturedMovie();

    }, [type]);


  return (
    <div className='featured'>
        {type && (
            <div className="category">
                <span>{type === "movies" ? 'Movies' : 'Series'}</span>
                <select name="genre" id="genre">
                    <option>Genre</option>
                    <option value="adventure">Adventure</option>
                    <option value="comedy">Comedy</option>
                    <option value="crime">Crime</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="historical">Historical</option>
                    <option value="horror">Horror</option>
                    <option value="romance">Romance</option>
                    <option value="sci-fi">Sci-fi</option>
                    <option value="thriller">Thriller</option>
                    <option value="western">Western</option>
                    <option value="animation">Animation</option>
                    <option value="drama">Drama</option>
                    <option value="documentary">Documentary</option>
                </select>
            </div>
        )}
        <img 
            src={content.img} 
            alt="" 
        /> 
        <div className="info">
            <img 
                id='title'
                src={content.imgThumbnail} 
                alt="" 
            />
            <span className='desc'>
                {content.desc}
            </span>
            <div className="buttons">
                <button className="play">
                    <PlayArrow/>
                    <span>Play</span>
                </button>
                <button className="moreInfo">
                    <InfoOutlined />
                    <span>Info</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Featured