import { PropTypes } from "prop-types";
import { forwardRef } from "react";
import { AiOutlineClose } from "react-icons/ai";

const Sidebar = forwardRef(function Sidebar({ toggleSidebar }, ref) {
	return (
		<div
			id="sidebar-container"
			ref={ref}>
			<button
				className="close-icon-btn"
				onClick={toggleSidebar}>
				<AiOutlineClose />
			</button>
			<button onClick={toggleSidebar}>Home</button>
			<button onClick={toggleSidebar}>Discover Photos</button>
			<button onClick={toggleSidebar}>Popular Searches</button>
			<button onClick={toggleSidebar}>Free Videos</button>
			<button onClick={toggleSidebar}>Challenges</button>
			<button onClick={toggleSidebar}>Leaderboard</button>
			<button onClick={toggleSidebar}>Pexels Blog</button>
		</div>
	);
});

Sidebar.propTypes = {
	toggleSidebar: PropTypes.func,
};

export default Sidebar;
