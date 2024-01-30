import { PropTypes } from "prop-types";

function DialogModal({ children }) {
	return <dialog>{children}</dialog>;
}

export default DialogModal;

DialogModal.propTypes = {
	children: PropTypes.node,
};
