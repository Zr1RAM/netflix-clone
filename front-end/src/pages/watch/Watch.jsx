import { ArrowBackOutlined } from '@material-ui/icons';
import './watch.scss';

const Watch = () => {
  return (
    <div className='watch'>
        <div className="back">
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