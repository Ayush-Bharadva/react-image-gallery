import { useRef } from "react";
import { PropTypes } from 'prop-types';
import "../MediaCard.scss";

const Video = ({ videoFile, image, ...props }) => {

  const videoRef = useRef(null);
  const { link, file_type } = videoFile;

  const playVideo = () => {
    if (videoRef?.current) {
      videoRef.current.play();
    }
  }

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef?.current?.pause();
    }
  }

  return (
    <>
      <img className="video-cover-image" src={image} loading="lazy" />
      <video
        {...props}
        className="video-card"
        ref={videoRef}
        onMouseEnter={playVideo}
        onMouseLeave={pauseVideo}
        playsInline
        muted
        preload="none"
      >
        <source src={link} type={file_type} />
      </video>
    </>
  )
}

export default Video

Video.propTypes = {
  videoFile: PropTypes.object.isRequired,
  image: PropTypes.string.isRequired
}