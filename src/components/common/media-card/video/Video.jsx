import { useRef } from "react";
import { PropTypes } from 'prop-types';
import "../MediaCard.scss";

const Video = ({ videoFile, ...props }) => {

  const videoRef = useRef();
  const { link, file_type } = videoFile;

  const playVideo = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  }

  return (
    <video
      {...props}
      className="video-card"
      ref={videoRef}
      onMouseEnter={playVideo}
      onMouseLeave={pauseVideo}
      playsInline
      muted>
      <source src={link} type={file_type} />
    </video>
  )
}

export default Video

Video.propTypes = {
  videoFile: PropTypes.object.isRequired
}