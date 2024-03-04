import { useRef } from "react";
import { PropTypes } from 'prop-types';
import "../MediaCard.scss";

function Video({ videoFile, ...props }) {

  const videoRef = useRef();
  const { link, file_type } = videoFile;

  return (
    <video
      {...props}
      className="video-card"
      ref={videoRef}
      onMouseEnter={() => videoRef.current.play()}
      onMouseLeave={() => videoRef.current.pause()}
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