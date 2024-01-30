import "./Photo.scss";
import { IoBookmarksOutline, IoHeartOutline } from "react-icons/io5";
import Button from "../../UI/button/Button";
// import Navbar from "../../components/Common/navbar/Navbar";
import { SiCanva } from "react-icons/si";
import { onDownloadImage } from "../../helper/utils";
import { useContext } from "react";
import { ImageContext } from "../../context/ImageProvider";
import { FiDownload } from "react-icons/fi";
import { AiTwotoneCheckCircle } from "react-icons/ai";
import { GrLocation } from "react-icons/gr";
import { BsInfoCircle } from "react-icons/bs";
import { CiShare1 } from "react-icons/ci";
import avatar from "../../assets/images/profile-avatar.jpg";
// import ImageModal from "../../components/Common/ImageModal/ImageModal";
// import Modal from "../../components/Common/modal/Modal";
// import { FaLinkedinIn, FaPinterest, FaTwitter } from "react-icons/fa";
// import { ImFacebook2 } from "react-icons/im";
// import { MdOutlineContentCopy } from "react-icons/md";

function Photo() {
	// const [showShareModal, setShowShareModal] = useState(true);
	// const [showModal, setShowModal] = useState(false);

	// const onShare = () => {
	// 	setShowModal(true);
	// 	// setShowShareModal(true);
	// };

	// const onCloseShare = () => {
	// 	setShowModal(false);
	// 	// setShowShareModal(false);
	// };

	// const openModal = () => {
	// 	setShowModal(true);
	// };
	// const closeModal = () => {
	// 	setShowModal(false);
	// };

	const {
		modalImageInfo: { image }
	} = useContext(ImageContext);
	// console.log(modalImageInfo);

	const {
		photographer,
		src: { large: imageUrl },
		alt
	} = image;
	// console.log(imageUrl);

	const newAlt = alt.replace(/\s/g, "-");
	console.log(newAlt);

	const handleDownload = () => {
		onDownloadImage(imageUrl, alt);
	};

	// const onCopyToClipBoard = (value) => {
	// 	navigator.clipboard.writeText(value);
	// };

	// const [showModal, setShowModal] = useState(false);
	// const onCloseModal = () => {
	// 	setShowModal(false);
	// };

	return (
		<>
			<div className="photo-container">
				<div className="top">
					<div className="image-info">
						<div className="profile">
							<div className="profile-img">
								<img
									src={avatar}
									alt="avatar image"
								/>
							</div>
							<div className="profile-name">
								<p>{photographer}</p>
								<p>Follow | Donate</p>
							</div>
						</div>
						<div className="actions">
							<Button>
								<IoBookmarksOutline className="icon" />
								<span>Collect</span>
							</Button>
							<Button>
								<IoHeartOutline className="icon" />
								<span>Like</span>
							</Button>
							<Button>
								<SiCanva className="icon" />
								<span>Edit in Canva</span>
							</Button>
							<Button
								className="download-btn-bg text-white"
								onClick={handleDownload}>
								<span className="download-text">Free Download</span> <FiDownload className="icon" />
							</Button>
						</div>
					</div>
				</div>
				<div className="middle">
					<div className="image-container">
						<img
							src={imageUrl}
							alt={alt}
							className="photo-img"
						/>
					</div>
				</div>
				<div className="bottom">
					<div className="more-info">
						<p className="more-image-info flex-row gap-12">
							<span className="text-center-v">
								<AiTwotoneCheckCircle />
								Free to use
							</span>
							<span className="text-center-v">
								<GrLocation /> NewZealand
							</span>
						</p>
						<div className="buttons">
							<Button>
								<BsInfoCircle className="icon" /> <span>More Info</span>
							</Button>
							<Button>
								<CiShare1 className="icon" /> <span>Share</span>
							</Button>
						</div>
					</div>
				</div>
			</div>
			{/* {showModal && <ImageModal />} */}
		</>
	);
}

export default Photo;
