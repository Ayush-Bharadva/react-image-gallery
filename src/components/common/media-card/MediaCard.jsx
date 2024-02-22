import { useCallback, useRef } from "react";
import { PropTypes } from "prop-types";
import "./MediaCard.scss";
import { IoBookmarksOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { downloadMedia } from "../../../utils/helper";

function MediaCard({ media, onSelectMedia, type }) {
  const videoRef = useRef();

  const {
    src: { large: imageSrc = "" } = {},
    alt: imageAlt = "",
  } = media;


  const videoFile = type === "videos" ? media.video_files.at(-1) : null;

  const handleMediaDownload = useCallback((event) => {
    downloadMedia(imageSrc || videoFile.link, imageAlt);
    event.stopPropagation();
  }, [imageSrc, imageAlt, videoFile]);

  return (
    <div className="media-container" key={media.id}>
      {type === "photos" ? (
        <img
          key={media.id}
          src={imageSrc}
          alt={imageAlt}
          onClick={() => onSelectMedia(media.id)}
        />
      ) : (
        <video
          ref={videoRef}
          key={media.id}
          className="video-card"
          onClick={() => onSelectMedia(media.id)}
          onMouseEnter={() => videoRef.current.play()}
          onMouseLeave={() => videoRef.current.pause()}
          playsInline
          muted>
          <source src={videoFile.link} type={videoFile.file_type} />
        </video>
      )}
      <div className="icons-group">
        <button className="bookmark-icon">
          <IoBookmarksOutline />
        </button>
        <button className="heart-icon">
          <FaRegHeart />
        </button>
      </div>
      <button
        type="button"
        className="download-icon"
        onClick={handleMediaDownload}>
        <FiDownload /> Download
      </button>
    </div>
  );
}

export default MediaCard;

MediaCard.propTypes = {
  media: PropTypes.object,
  onSelectMedia: PropTypes.func,
  type: PropTypes.string,
};
