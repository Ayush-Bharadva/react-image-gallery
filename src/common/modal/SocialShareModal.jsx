import { PropTypes } from "prop-types";
import { RxCross1 } from "react-icons/rx";
import Modal from "./Modal";
import { MdOutlineContentCopy } from "react-icons/md";
import SocialIconsMenu from "../../components/SocialIconsMenu";
import { onCopyToClipBoard } from "../../helper/utils";

function SocialShareModal({ onClose, photographer }) {
	return (
		<Modal>
			<div className="social-share-modal-container">
				<button
					className="modal-close-btn close-modal-btn"
					onClick={onClose}>
					<RxCross1 />
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
							onClick={onCopyToClipBoard}>
							Photo by {photographer} from Pexels
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
	onClose: PropTypes.func.isRequired,
	photographer: PropTypes.string.isRequired
};
