import { useContext } from "react";
import PropTypes from "prop-types";
import Button from "../../../UI/button/Button";
import { MainContext } from "../../../context/MainProvider";
import { onDownloadImage } from "../../../utils/utils";
import { IoBookmarksOutline, IoHeartOutline } from "react-icons/io5";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { FiDownload } from "react-icons/fi";
import avatar from "../../../assets/images/user-avatar.png";
import SocialShareModal from "./SocialShareModal";
import ImageDetailsModal from "./ImageDetailsModal";
import { RxCross1 } from "react-icons/rx";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { SiCanva } from "react-icons/si";
import { CiShare1 } from "react-icons/ci";
import { BsInfoCircle } from "react-icons/bs";
import Modal from "./Modal";
import useModal from "../../../hooks/useModal";

function ImageModal({ handleImageNavigate, isShowing, hide }) {
	const { isShowing: showImageDetails, toggle: toggleImageDetails } = useModal();
	const { isShowing: showShareInfo, toggle: toggleShareInfo } = useModal();

	const { modalImage } = useContext(MainContext);
	// console.log("modalImage :", modalImage);

	const {
		id,
		photographer,
		src: { large: imageUrl },
		alt
	} = modalImage;

	const handleDownload = () => onDownloadImage(imageUrl, alt);

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
				onClick={() => handleImageNavigate(id, -1)}
				className="modal-btn previous-image-btn">
				<FaAngleLeft />
			</button>
			<button
				onClick={() => handleImageNavigate(id, 1)}
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
								<p>{photographer}</p>
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
							<Button type="outlined-button">
								<SiCanva className="icon" />
								<span>Edit in Canva</span>
							</Button>
							<Button
								type="filled-button"
								className="download-btn-bg text-white"
								onClick={handleDownload}>
								<span className="download-text">Free Download</span> <FiDownload className="icon" />
							</Button>
						</div>
					</div>
					<div className="image-container">
						<img
							src={imageUrl}
							alt={alt}
						/>
					</div>
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
							<Button
								type="outlined-button"
								onClick={toggleImageDetails}>
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
			<ImageDetailsModal
				modalImage={imageUrl}
				isShowing={showImageDetails}
				hide={toggleImageDetails}
			/>
			<SocialShareModal
				photographer={photographer}
				isShowing={showShareInfo}
				hide={toggleShareInfo}
			/>
		</Modal>
	);
}

ImageModal.propTypes = {
	handleImageNavigate: PropTypes.func.isRequired,
	isShowing: PropTypes.bool.isRequired,
	hide: PropTypes.func.isRequired
};
export default ImageModal;
