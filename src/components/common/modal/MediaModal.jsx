import { useMemo } from "react";
import { PropTypes } from "prop-types";
import Modal from "./Modal";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import profileAvatar from "../../../assets/images/user-avatar.png";
import SocialShareModal from "./SocialShareModal";
import { BsInfoCircle } from "react-icons/bs";
import { CiShare1 } from "react-icons/ci";
import { GrLocation } from "react-icons/gr";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { IoBookmarksOutline, IoHeartOutline } from "react-icons/io5";
import { SiCanva } from "react-icons/si";
import useModal from "../../../hooks/useModal";
import { FiDownload } from "react-icons/fi";
import MediaDetailsModal from "./MediaDetailsModal";
import { MediaType, ToastIcons } from "../../../utils/constants";
import { downloadMedia, showToast } from "../../../utils/helper";
import { IoClose } from "react-icons/io5";

const MediaModal = ({ closeModal, selectedMedia, changeSelectedMedia, mediaType, mediaListLength }) => {

  const { isShowing: showMediaDetails, toggle: toggleMediaDetails } = useModal();
  const { isShowing: showShareInfo, toggle: toggleShareInfo } = useModal();

  const mediaInfo = useMemo(() => {
    const {
      index,
      src: { large: imageUrl = "" } = {},
      alt,
      photographer = "",
      user: { name = "", url = "" } = {},
      image: videoImageUrl = "",
      url: photoUrl = "",
      video_files = [],
    } = selectedMedia;

    const videoObj = video_files.at(-1);

    if (mediaType === "photos") {
      return { index, mediaSrc: imageUrl, altText: alt, creatorName: photographer, modalImageSrc: imageUrl, copyLinkSrc: photoUrl }
    } else {
      return { index, videoId: videoObj.id, mediaSrc: videoObj.link, file_type: videoObj.file_type, altText: alt, creatorName: name, modalImageSrc: videoImageUrl, copyLinkSrc: url }
    }
  }, [mediaType, selectedMedia]);

  const { index, mediaSrc, altText, creatorName, modalImageSrc, copyLinkSrc, file_type, videoId } = mediaInfo;

  const getPreviousMedia = () => changeSelectedMedia(index - 1);
  const getNextMedia = () => changeSelectedMedia(index + 1);

  const handleMediaDownload = () => {
    downloadMedia(mediaSrc, altText);
  }

  return (
    <Modal>
      <button
        className="modal-btn modal-close-btn"
        onClick={closeModal}>
        <IoClose />
      </button>
      {index !== 0 && <button
        onClick={getPreviousMedia}
        className="modal-btn previous-image-btn">
        <FaAngleLeft />
      </button>}
      {(index !== mediaListLength - 1) && <button
        onClick={getNextMedia}
        className="modal-btn next-image-btn">
        <FaAngleRight />
      </button>}
      <div className="modal-container">
        <div className="modal-info-container">
          <div className="image-info">
            <div className="profile">
              <div className="profile-img">
                <img
                  src={profileAvatar}
                  alt="profile-avatar"
                />
              </div>
              <div className="profile-name">
                <p>{creatorName}</p>
                <p>Follow | Donate</p>
              </div>
            </div>
            <div className="actions">
              <button className="outlined-button" >
                <IoBookmarksOutline className="icon" />
                <span>Collect</span>
              </button>
              <button className="outlined-button" onClick={() => showToast("Liked", ToastIcons.like)} >
                <IoHeartOutline className="icon" />
                <span>Like</span>
              </button>
              <button className="outlined-button" >
                <SiCanva className="icon" />
                <span>Edit in Canva</span>
              </button>
              <button
                className="filled-button download-btn-bg text-white"
                onClick={handleMediaDownload}
              >
                <span className="download-text">Free Download</span> <FiDownload className="icon" />
              </button>
            </div>
          </div>

          {mediaType === "photos" ?
            <div className="image-container">
              <img
                src={mediaSrc}
                alt={altText}
              />
            </div> :
            <div className="video-container">
              <video
                muted
                autoPlay
                controls
                key={videoId}>
                <source
                  src={mediaSrc}
                  type={file_type}
                />
              </video>
            </div>}
          <div className="more-info">
            <div className="more-image-info flex-row gap-12">
              <p className="text-center-v">
                <AiTwotoneCheckCircle />
                Free to use
              </p>
              <p className="text-center-v">
                <GrLocation /> NewZealand
              </p>
            </div>
            <div className="buttons">
              <button
                className="outlined-button"
                onClick={toggleMediaDetails}>
                <BsInfoCircle className="icon" /> <span>More Info</span>
              </button>
              <button
                className="outlined-button"
                onClick={toggleShareInfo}>
                <CiShare1 className="icon" /> <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {showMediaDetails && <MediaDetailsModal
        modalImageUrl={modalImageSrc}
        closeModal={toggleMediaDetails}
        mediaType={MediaType.photos} />}
      {showShareInfo && <SocialShareModal
        closeModal={toggleShareInfo}
        name={creatorName}
        url={copyLinkSrc} />}
    </Modal>
  );
}

export default MediaModal;

MediaModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  selectedMedia: PropTypes.object,
  changeSelectedMedia: PropTypes.func.isRequired,
  mediaType: PropTypes.string.isRequired,
  mediaListLength: PropTypes.number
};