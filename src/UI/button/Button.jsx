import PropTypes from "prop-types";
import "./Button.scss";

function Button({ type, className, children, ...props }) {
	const btnClass = `${type} ` + className;

	return (
		<button
			className={btnClass}
			{...props}>
			{children}
		</button>
	);
}

Button.propTypes = {
	type: PropTypes.string,
	className: PropTypes.string,
	props: PropTypes.object,
	children: PropTypes.node
};

export default Button;
