import { createPortal } from "react-dom";
import { PropTypes } from "prop-types";
import "./Modal.scss";
import { useEffect } from "react";

const Modal = ({ isShowing, children }) => {

	useEffect(() => {
		if (isShowing) {
			document.body.classList.add("overflow-hidden");
		}
		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [isShowing]);

	return isShowing
		? createPortal(
			<div className="modal-overlay">
				<div className="modal-wrapper">
					<div className="modal">{children}</div>
				</div>
			</div>,
			document.getElementById("modal")
		)
		: null;
}

export default Modal;

Modal.defaultProps = {
	isShowing: true
};

Modal.propTypes = {
	isShowing: PropTypes.bool,
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
};
