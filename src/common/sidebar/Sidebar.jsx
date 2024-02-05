import { PropTypes } from "prop-types";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

function Sidebar({ toggleSidebar }) {
	const navigate = useNavigate();

	const onNavToHome = () => navigate("/");

	return (
		<div id="sidebar-container">
			<button
				className="close-icon-btn"
				onClick={toggleSidebar}>
				<AiOutlineClose />
			</button>
			<button onClick={onNavToHome}>Home</button>
			<button onClick={toggleSidebar}>Discover Photos</button>
			<button onClick={toggleSidebar}>Popular Searches</button>
			<button onClick={toggleSidebar}>Free Videos</button>
			<button onClick={toggleSidebar}>Challenges</button>
			<button onClick={toggleSidebar}>Leaderboard</button>
			<button onClick={toggleSidebar}>Pexels Blog</button>
		</div>
	);
}

Sidebar.propTypes = {
	toggleSidebar: PropTypes.func
};

export default Sidebar;
