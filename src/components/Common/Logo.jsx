import { useNavigate } from "react-router-dom";
import pexelsLogo from "../../assets/images/pexels-logo.jpg";

function Logo() {
	const navigate = useNavigate();
	const navigateToHome = () => {
		navigate("/");
	};

	return (
		<div
			className="logo"
			onClick={navigateToHome}>
			<img
				src={pexelsLogo}
				alt="pexels logo"
			/>
			<span>Pexels</span>
		</div>
	);
}

export default Logo;
