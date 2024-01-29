import { forwardRef, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";
import { PropTypes } from "prop-types";
import "./Modal.scss";

const Modal = forwardRef(function Modal({ children }, ref) {
	const modalNode = document.getElementById("modal");
	const modalRef = useRef(null);

	useImperativeHandle(ref, () => {
		return {
			open() {
				modalRef.current.showModal();
			},
			close() {
				modalRef.current.close();
			},
		};
	});

	return createPortal(
		<dialog
			ref={modalRef}
			className="container-modal">
			{children}
		</dialog>,
		modalNode
	);
});

export default Modal;

Modal.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
