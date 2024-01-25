import { forwardRef, useImperativeHandle, useRef } from "react";
import { PropTypes } from "prop-types";
import "./Modal.scss";
import { createPortal } from "react-dom";

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
			{/* <form method="dialog">
				<button>close</button>
			</form> */}
		</dialog>,
		modalNode
	);
});

export default Modal;

Modal.propTypes = {
	children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};
