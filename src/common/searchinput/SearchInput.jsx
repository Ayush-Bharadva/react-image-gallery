import { PropTypes } from "prop-types";
import { CiSearch } from "react-icons/ci";
import { HiOutlinePhotograph } from "react-icons/hi";
import { GoChevronDown } from "react-icons/go";
import "./SearchInput.scss";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageContext } from "../../context/ImageProvider";
import { RiVideoLine } from "react-icons/ri";

function SearchInput({ className, props }) {
	const navigate = useNavigate();
	const { setQuery, query } = useContext(ImageContext);

	const [isHovering, setIsHovering] = useState(false);
	const [searchString, setSearchString] = useState(query || "");

	const onChange = ({ target: { value } }) => {
		setSearchString(value);
	};

	const onSubmit = event => {
		event.preventDefault();
		if (!searchString.trim()) {
			return;
		}
		setQuery(searchString);
		navigate(`/search/${searchString}`);
	};

	const handleMouseOver = () => {
		setIsHovering(true);
	};
	const handleMouseOut = () => {
		setTimeout(() => {
			setIsHovering(false);
		}, 500);
	};

	const buttonOptions = (
		<div className="button-options">
			<button>
				<HiOutlinePhotograph /> <span>Photos</span>
			</button>
			<button>
				<RiVideoLine /> <span>Videos</span>
			</button>
		</div>
	);

	return (
		<div
			className={`search-input-container ${className}`}
			{...props}>
			<button
				className="option-btn"
				onMouseOver={handleMouseOver}
				onMouseOut={handleMouseOut}>
				<HiOutlinePhotograph /> <span>Photos</span> <GoChevronDown />
				{/* {buttonOptions} */}
				{isHovering ? buttonOptions : null}
			</button>
			<form
				onSubmit={onSubmit}
				className="search-input">
				<input
					id="search"
					type="text"
					title={searchString}
					value={searchString}
					onChange={onChange}
					placeholder="Search for free photos"
				/>
				<button
					type="submit"
					className="search-icon-btn">
					<CiSearch />
				</button>
			</form>
		</div>
	);
}

SearchInput.propTypes = {
	searchString: PropTypes.string,
	onChange: PropTypes.func,
	onSubmit: PropTypes.func,
	className: PropTypes.string,
	props: PropTypes.object
};

export default SearchInput;
