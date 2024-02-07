import { useNavigate } from "react-router-dom";
import pexelsLogo from "../../assets/images/pexels-logo.jpg";
import "./Logo.scss";

function Logo() {
	const navigate = useNavigate();

	const navigateToHome = () => {
		navigate("/");
	};

	return (
		<div
			className="pexels-logo"
			onClick={navigateToHome}>
			<img
				className="logo-image"
				src={pexelsLogo}
				alt="pexels logo"
			/>
			<p className="logo-text">Pexels</p>
		</div>
	);
}

export default Logo;
