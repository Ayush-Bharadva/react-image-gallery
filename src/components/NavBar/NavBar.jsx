import pexelsLogo from "../../assets/images/pexels-logo.jpg";
import "./NavBar.scss";

function NavBar() {
	return (
		<div className="nav-bar">
			<div className="logo">
				<img
					src={pexelsLogo}
					alt="pexels logo"
				/>
				<span>Pexels</span>
			</div>
			<ul className="nav-items">
				<li>Explore</li>
				<li>License</li>
				<li>
					<button>Upload</button>
				</li>
			</ul>
		</div>
	);
}

export default NavBar;
