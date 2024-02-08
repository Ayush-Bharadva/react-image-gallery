import { createPortal } from "react-dom";
import { PropTypes } from "prop-types";
import "./Modal.scss";

function Modal({ isShowing, children }) {
	return isShowing
		? createPortal(
				<div className="modal-overlay">
					<div className="modal-wrapper">
						<div className="modal">
							<div className="modal-header"></div>
							{children}
						</div>
					</div>
				</div>,
				document.getElementById("modal")
		  )
		: null;
}

export default Modal;

Modal.propTypes = {
	isShowing: PropTypes.bool,
	hide: PropTypes.func,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
