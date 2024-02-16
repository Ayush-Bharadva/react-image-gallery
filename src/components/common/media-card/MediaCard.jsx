import { useCallback, useEffect, useRef, useState } from "react";
import { PropTypes } from "prop-types";
import "./MediaCard.scss";
import { IoBookmarksOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { downloadMedia } from "../../../utils/utils";

function MediaCard({ media, onSelect, type }) {
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef();

  const handleMediaDownload = useCallback((event, mediaLink, mediaName) => {
    downloadMedia(mediaLink, mediaName);
    event.stopPropagation();
  }, []);

  const {
    image: {
      src: { large: imageSrc = "" },
      alt: imageAlt = "",
    },
  } = media;

  const videoFile = type === "videos" ? media.video_files.at(-1) : null;

  useEffect(() => {
    if (isHovering && videoRef.current) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [isHovering]);

  return (
    <div className="media-container" key={media.id}>
      {type === "photos" ? (
        <img src={imageSrc} alt={imageAlt} />
      ) : (
        <video
          ref={videoRef}
          key={media.id}
          className="video-card"
          onClick={() => onSelect(media.id)}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          playsInline
          muted
        >
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
        onClick={() => handleMediaDownload(imageSrc || videoFile.link, imageAlt || "Your-Video")}
      >
        <FiDownload /> Download
      </button>
    </div>
  );
}

export default MediaCard;

MediaCard.propTypes = {
  media: PropTypes.object,
  onSelect: PropTypes.func,
  type: PropTypes.string,
};
