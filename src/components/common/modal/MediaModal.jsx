import { PropTypes } from "prop-types";
import { RxCross1 } from "react-icons/rx";
import Modal from "./Modal";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import avatar from "../../../assets/images/user-avatar.png";
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
import { MediaType } from "../../../utils/constants";
import { downloadMedia } from "../../../utils/helper";

function MediaModal({ isShowing, hide, selectedMedia, handleMediaNavigate, type }) {

  const { isShowing: showMediaDetails, toggle: toggleMediaDetails } = useModal();
  const { isShowing: showShareInfo, toggle: toggleShareInfo } = useModal();

  const {
    id,
    photographer = "",
    user: { name = "" } = {},
    src: { large: imageUrl = "" } = {},
    image: videoImageUrl = "",
    video_files = [],
    alt = "",
  } = selectedMedia;

  const videoObj = video_files.at(-1);

  return (
    <Modal
      isShowing={isShowing}
      hide={hide}>
      <button
        className="modal-btn modal-close-btn"
        onClick={hide}>
        <RxCross1 />
      </button>
      <button
        onClick={() => handleMediaNavigate(id, -1)}
        className="modal-btn previous-image-btn">
        <FaAngleLeft />
      </button>
      <button
        onClick={() => handleMediaNavigate(id, 1)}
        className="modal-btn next-image-btn">
        <FaAngleRight />
      </button>
      <div className="modal-container">
        <div className="modal-info-container">
          <div className="image-info">
            <div className="profile">
              <div className="profile-img">
                <img
                  src={avatar}
                  alt="profile-avatar"
                />
              </div>
              <div className="profile-name">
                <p>{type === "photos" ? photographer : name}</p>
                <p>Follow | Donate</p>
              </div>
            </div>
            <div className="actions">
              <button className="outlined-button" >
                <IoBookmarksOutline className="icon" />
                <span>Collect</span>
              </button>
              <button className="outlined-button" >
                <IoHeartOutline className="icon" />
                <span>Like</span>
              </button>
              <button className="outlined-button" >
                <SiCanva className="icon" />
                <span>Edit in Canva</span>
              </button>
              <button
                className="filled-button download-btn-bg text-white"
                onClick={() => downloadMedia(type === "photos" ? imageUrl : videoObj.link)}
              >
                <span className="download-text">Free Download</span> <FiDownload className="icon" />
              </button>
            </div>
          </div>

          {type === 'photos' ?
            <div className="image-container">
              <img
                src={imageUrl}
                alt={alt}
              />
            </div> :
            <div className="video-container">
              <video
                muted
                autoPlay
                controls
                key={videoObj.id}>
                <source
                  src={videoObj.link}
                  type={videoObj.file_type}
                />
              </video>
            </div>
          }
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
      <MediaDetailsModal
        modalImageUrl={type === "photos" ? imageUrl : videoImageUrl}
        isShowing={showMediaDetails}
        hide={toggleMediaDetails}
        type={MediaType.photos} />
      <SocialShareModal
        photographer={photographer}
        isShowing={showShareInfo}
        hide={toggleShareInfo} />
    </Modal>
  );
}

export default MediaModal;

MediaModal.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  selectedMedia: PropTypes.object,
  handleMediaNavigate: PropTypes.func.isRequired,
};