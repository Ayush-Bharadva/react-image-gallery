import { useCallback, } from "react";
import { PropTypes } from "prop-types";
import "../media-card/MediaCard.scss";
import { IoBookmarksOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { FiDownload } from "react-icons/fi";
import { downloadMedia, showToast } from "../../../utils/helper";
import Video from "./video/Video";
import { ToastIcons } from "../../../utils/constants";

const MediaCard = ({ media, onSelectMedia, mediaType }) => {

  const { src: { large: imageSrc = "" } = {}, alt: imageAlt = "" } = media;

  const videoFile = mediaType === "videos" ? media.video_files.at(-1) : null;

  const selectMedia = () => onSelectMedia(media);

  const handleMediaDownload = useCallback((event) => {
    downloadMedia(mediaType === 'photos' ? imageSrc : videoFile.link, imageAlt);
    event.stopPropagation();
  }, [imageSrc, videoFile, imageAlt, mediaType]);

  return (
    <div className="media-container">
      {mediaType === "photos" ? (
        <img
          key={media.id}
          src={imageSrc}
          alt={imageAlt}
          onClick={selectMedia}
        />
      ) : (
        <Video key={media.id} onClick={selectMedia} videoFile={videoFile} />
      )}
      <div className="icons-group">
        <button className="bookmark-icon">
          <IoBookmarksOutline />
        </button>
        <button className="heart-icon" onClick={() => showToast("Liked", ToastIcons.like)} >
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
  mediaType: PropTypes.string,
};
