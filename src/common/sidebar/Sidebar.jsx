import { PropTypes } from "prop-types";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import SearchInput from "../searchinput/SearchInput";
import Logo from "../../components/Header/Logo";

function Sidebar({ toggleSidebar, items, showNavbar = false }) {
	const navigate = useNavigate();

	const gotoHome = () => navigate("/");

	return (
		<div id="sidebar-container">
			{showNavbar && <Navbar />}
			<div className="sidebar-nav">
				<Logo />
				<SearchInput />
				<button
					className="close-icon-btn"
					onClick={toggleSidebar}>
					<AiOutlineClose />
				</button>
			</div>
			<button
				className="nav-btn"
				onClick={gotoHome}>
				Home
			</button>
			{items.map(item => (
				<button
					key={item}
					className="nav-btn">
					{item}
				</button>
			))}
		</div>
	);
}

Sidebar.propTypes = {
	toggleSidebar: PropTypes.func,
	showNavbar: PropTypes.func,
	items: PropTypes.array
};

export default Sidebar;
