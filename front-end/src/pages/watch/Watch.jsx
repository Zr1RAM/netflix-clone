import { ArrowBackOutlined } from '@material-ui/icons';
import './watch.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';

const Watch = () => {
  const movie = useLocation().movie;
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1)
  };

  return (
    <div className='watch'>
      <div className="back" onClick={handleGoBack}>
        <ArrowBackOutlined /> 
        home
      </div>
      <video 
          className='video' 
          autoPlay 
          progress 
          controls 
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" 
      />
    </div>
  )
}

export default Watch