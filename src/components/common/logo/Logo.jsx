import { useNavigate } from "react-router-dom";
import pexelsLogo from "../../../assets/images/pexels-logo.jpg";
import "./Logo.scss";
import { PropTypes } from "prop-types";

const Logo = ({ textColor }) => {
	const navigate = useNavigate();

	const navigateToHome = () => {
		navigate("/");
		window.scrollTo(0, 0);
	};

	return (
		<div className="pexels-logo" onClick={navigateToHome}>
			<img className="logo-image" src={pexelsLogo} alt="pexels logo" />
			<p className="logo-text" style={{ color: `${textColor}` }}> Pexels </p>
		</div>
	);
}

export default Logo;

Logo.propTypes = {
	textColor: PropTypes.string
};
