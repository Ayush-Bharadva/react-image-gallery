import { useRef } from "react";
import "./Sidebar.scss";
import { AiOutlineClose } from "react-icons/ai";

function Sidebar() {
	const sidebarRef = useRef();

	const onCloseSidebar = () => {
		sidebarRef.current.style.width = "0";
	};

	return (
		<div
			id="sidebar-container"
			ref={sidebarRef}>
			<button className="close-icon-btn">
				<AiOutlineClose onClick={onCloseSidebar} />
			</button>
			<button>Home</button>
			<button>Discover Photos</button>
			<button>Popular Searches</button>
			<button>Free Videos</button>
			<button>Challenges</button>
			<button>Leaderboard</button>
			<button>Pexels Blog</button>
		</div>
	);
}

export default Sidebar;
