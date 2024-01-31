import { PropTypes } from "prop-types";
import { CiSearch } from "react-icons/ci";
import { HiOutlinePhotograph } from "react-icons/hi";
import { GoChevronDown } from "react-icons/go";
import "./SearchInput.scss";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImageContext } from "../../context/ImageProvider";

function SearchInput({ className, props }) {
	const navigate = useNavigate();
	const { setQuery, query } = useContext(ImageContext);
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

	return (
		<div
			className={`search-input-container ${className}`}
			{...props}>
			<button className="option-btn">
				<HiOutlinePhotograph style={{ fontSize: "1.25rem" }} /> <span>Photos</span> <GoChevronDown style={{ fontSize: "1rem" }} />
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
