import { PropTypes } from "prop-types";
import { GiHamburgerMenu } from "react-icons/gi";
import pexelsLogo from "../../assets/images/pexels-logo.jpg";
import "./NavBar.scss";

function NavBar({ onSidebarOpen }) {
	return (
		<>
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
					<li>
						<button className="sidebar-btn">
							<GiHamburgerMenu onClick={onSidebarOpen} />
						</button>
					</li>
				</ul>
			</div>
		</>
	);
}

NavBar.propTypes = {
	onSidebarOpen: PropTypes.func,
};

export default NavBar;
