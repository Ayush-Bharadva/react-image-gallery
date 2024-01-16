import PropTypes from "prop-types";
import "./Button.scss";

function Button({ props, children, className }) {
	const btnClass = "outlined-button " + className;

	return (
		<button
			className={btnClass}
			{...props}>
			{children}
		</button>
	);
}

Button.propTypes = {
	props: PropTypes.object,
	children: PropTypes.node,
	className: PropTypes.string,
};

export default Button;
