import { PropTypes } from "prop-types";
import { CiSearch } from "react-icons/ci";
import { HiOutlinePhotograph } from "react-icons/hi";
import { GoChevronDown } from "react-icons/go";
import "./SearchInput.scss";

function SearchInput({ searchString, onChange, onSubmit, props }) {
	return (
		<div
			className="search-input-container"
			{...props}>
			<button className="option-btn">
				{" "}
				<HiOutlinePhotograph style={{ fontSize: "1.25rem" }} /> <span>Photos</span>{" "}
				<GoChevronDown style={{ fontSize: "1rem" }} />
			</button>
			<form
				onSubmit={onSubmit}
				className="search-input">
				<input
					id="search"
					type="text"
					value={searchString}
					onChange={onChange}
					placeholder="Search for free photos"
				/>
				<button className="search-icon-btn">
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
	props: PropTypes.object,
};

export default SearchInput;
