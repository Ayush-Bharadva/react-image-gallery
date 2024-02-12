import { PropTypes } from "prop-types";
import SocialShareModal from "./SocialShareModal";
import Button from "../../UI/button/Button";
import { BsInfoCircle } from "react-icons/bs";
import { CiShare1 } from "react-icons/ci";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { IoBookmarksOutline, IoHeartOutline } from "react-icons/io5";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import Modal from "./Modal";
import useModal from "../../hooks/useModal";
import { FiDownload } from "react-icons/fi";
import avatar from "../../assets/images/user-avatar.png";
import { onDownloadVideo } from "../../helper/utils";
import { useContext } from "react";
import { MainContext } from "../../context/MainProvider";
import VideoDetailsModal from "./VideoDetailsModal";

function VideoModal({ isShowing, hide, handleVideoNavigation }) {
	const { isShowing: showShareInfo, toggle: toggleShareInfo } = useModal();
	const { isShowing: showVideoDetailsModal, toggle: toggleVideoDetailsModal } = useModal();

	const { modalVideo } = useContext(MainContext);
	// console.log(modalVideo);

	const {
		id,
		user: { name },
		image: videoImageUrl,
		video_files
	} = modalVideo;

	const videoObj = video_files.at(-1);
	// console.log("videoObj :", videoObj);

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
				onClick={() => handleVideoNavigation(id, -1)}
				className="modal-btn previous-image-btn">
				<FaAngleLeft />
			</button>
			<button
				onClick={() => handleVideoNavigation(id, 1)}
				className="modal-btn next-image-btn">
				<FaAngleRight />
			</button>
			<div className="modal-container">
				<div className="modal-info-container">
					<div className="video-info">
						<div className="profile">
							<div className="profile-img">
								<img
									src={avatar}
									alt="profile-avatar"
								/>
							</div>
							<div className="profile-name">
								<p>{name}</p>
								<p>Follow | Donate</p>
							</div>
						</div>
						<div className="actions">
							<Button type="outlined-button">
								<IoBookmarksOutline className="icon" />
								<span>Collect</span>
							</Button>
							<Button type="outlined-button">
								<IoHeartOutline className="icon" />
								<span>Like</span>
							</Button>
							<Button
								type="filled-button"
								className="download-btn-bg text-white"
								onClick={() => onDownloadVideo(videoObj.link)}>
								<span className="download-text">Free Download</span> <FiDownload className="icon" />
							</Button>
						</div>
					</div>
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
					<div className="more-info">
						<p className="more-image-info flex-row gap-12">
							<span className="text-center-v">
								<AiTwotoneCheckCircle />
								Free to use
							</span>
						</p>
						<div className="buttons">
							<Button
								type="outlined-button"
								onClick={toggleVideoDetailsModal}>
								<BsInfoCircle className="icon" /> <span>More Info</span>
							</Button>
							<Button
								type="outlined-button"
								onClick={toggleShareInfo}>
								<CiShare1 className="icon" /> <span>Share</span>
							</Button>
						</div>
					</div>
				</div>
			</div>
			<VideoDetailsModal
				isShowing={showVideoDetailsModal}
				hide={toggleVideoDetailsModal}
				videoImageUrl={videoImageUrl}
			/>
			<SocialShareModal
				photographer="photographer"
				isShowing={showShareInfo}
				hide={toggleShareInfo}
			/>
		</Modal>
	);
}

export default VideoModal;

VideoModal.propTypes = {
	isShowing: PropTypes.bool.isRequired,
	hide: PropTypes.func.isRequired,
	handleVideoNavigation: PropTypes.func
};
