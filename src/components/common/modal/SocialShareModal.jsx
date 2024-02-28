import { PropTypes } from "prop-types";
import Modal from "./Modal";
import { MdOutlineContentCopy } from "react-icons/md";
import { onCopyToClipBoard, showToast } from "../../../utils/helper";
import SocialIconsMenu from "../SocialIconsMenu";
import { IoClose } from "react-icons/io5";

function SocialShareModal({ isShowing, hide, linkInfo: { name, url } }) {

	const handleCopyToClipBoard = () => {
		onCopyToClipBoard(url);
		showToast("text copied to clipboard");
	}

	return (
		<Modal isShowing={isShowing}>
			<div className="social-share-modal-container">
				<button
					className="modal-close-btn close-modal-btn"
					onClick={hide}>
					<IoClose />
				</button>
				<div className="social-share-modal flex-column-center">
					<h1 className="modal-title">Share this with Your Community</h1>
					<div className="social-icons-container">
						<SocialIconsMenu />
					</div>
					<div className="social-link">
						<p>Set a link back to this photo</p>
						<button
							className="link-btn flex-row-center"
							onClick={handleCopyToClipBoard}>
							<p>
								Photo by {name} from Pexels
							</p>
							<MdOutlineContentCopy />
						</button>
					</div>
				</div>
			</div>
		</Modal>
	);
}

export default SocialShareModal;

SocialShareModal.propTypes = {
	isShowing: PropTypes.bool,
	hide: PropTypes.func.isRequired,
	linkInfo: PropTypes.object
};
