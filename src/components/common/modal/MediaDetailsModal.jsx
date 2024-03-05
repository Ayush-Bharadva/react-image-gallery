import { PropTypes } from 'prop-types';
import Modal from './Modal';
import { IoClose } from "react-icons/io5";
import { MediaDetails } from '../../../utils/constants';

const MediaDetailsModal = ({ modalImageUrl, closeModal, mediaType }) => {

  const { title,
    statistics: { views, likes, downloads },
    relatedInfo: { dimensions, aspectRatio, camera, focal, aperture, iso, shutterSpeed, takenAt, duration, fps }
  } = MediaDetails[mediaType];

  return (
    <Modal>
      <div className="media-details-modal-container">
        <div className="top-container">
          <div className="top-container-header flex-row-center">
            <div className="image-container">
              <img src={modalImageUrl} />
            </div>
            <div className="top-heading">
              <h1>Photo details</h1>
              <p>{title}</p>
            </div>
          </div>
          <div className="statistics">
            <div>
              <p>Views</p>
              <p>{views}</p>
            </div>
            <div>
              <p>Likes</p>
              <p>{likes}</p>
            </div>
            <div>
              <p>Downloads</p>
              <p>{downloads}</p>
            </div>
          </div>
        </div>
        <div className="bottom-container">
          <button
            className="close-btn"
            onClick={closeModal}>
            <IoClose />
          </button>
          <div className="stat-info">
            <p title="Dimensions">Dimensions</p>
            <p title={dimensions}>{dimensions}</p>
          </div>
          <div className="stat-info">
            <p title="Aspect Ratio">Aspect Ratio</p>
            <p title={aspectRatio}>{aspectRatio}</p>
          </div>
          {mediaType === 'photos' ?
            <>
              <div className="stat-info">
                <p title="Camera">Camera</p>
                <p title={camera}>{camera}</p>
              </div>
              <div className="stat-info">
                <p title="Focal">Focal</p>
                <p title={focal}>{focal}</p>
              </div>
              <div className="stat-info">
                <p title="Aperture">Aperture</p>
                <p title={aperture}>{aperture}</p>
              </div>
              <div className="stat-info">
                <p title="ISO">ISO</p>
                <p title={iso}>{iso}</p>
              </div>
              <div className="stat-info">
                <p title="Shutter Speed">Shutter Speed</p>
                <p title={shutterSpeed}>{shutterSpeed}</p>
              </div>
              <div className="stat-info">
                <p title="Taken At">Taken At</p>
                <p title={takenAt}>{takenAt}</p>
              </div>
            </>
            :
            <>
              <div className="stat-info">
                <p title="Camera">Duration</p>
                <p title={duration}>{duration}</p>
              </div>
              <div className="stat-info">
                <p title="Focal">FPS</p>
                <p title={fps}>{fps}</p>
              </div>
            </>}
        </div>
      </div>
    </Modal>
  );
}

export default MediaDetailsModal

MediaDetailsModal.propTypes = {
  modalImageUrl: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  mediaType: PropTypes.string.isRequired
};