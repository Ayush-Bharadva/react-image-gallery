import { useRef } from "react";
import { PropTypes } from 'prop-types';
import "../media-card/MediaCard.scss";

function Video({ media, onSelectMedia }) {

  const videoRef = useRef();
  const videoFile = media.video_files.at(-1) || {};

  return (
    <video
      ref={videoRef}
      key={media.id}
      className="video-card"
      onClick={() => onSelectMedia(media)}
      onMouseEnter={() => videoRef.current.play()}
      onMouseLeave={() => videoRef.current.pause()}
      playsInline
      muted>
      <source src={videoFile.link} type={videoFile.file_type} />
    </video>
  )
}

export default Video

Video.propTypes = {
  media: PropTypes.object.isRequired,
  onSelectMedia: PropTypes.func.isRequired
}