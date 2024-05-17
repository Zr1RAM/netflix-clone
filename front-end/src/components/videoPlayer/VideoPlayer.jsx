import './videoPlayer.scss';
import YouTube from 'react-youtube';

const VideoPlayer = ({trailer}) => {
  return (
    <div className="iframe-container">
        {!trailer.includes("youtube") ? 
            <video src={trailer} autoPlay={true} loop/>
            : <YouTube 
                    videoId={trailer.split("=")[1]}
                    opts={{
                        width: 325,
                        height: 160,
                        playerVars: {
                            autoplay: 1,
                            controls: 0,
                            showinfo: 0,
                            rel: 0,
                            // disablekb: 0,
                            // modestbranding: 1,
                        },
                    }}
                />
        }
    </div>
  )
}

export default VideoPlayer;