import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { PropTypes } from "prop-types";

function SearchInput({ onSearch }) {
	const [searchString, setSearchString] = useState("");

	const onQueryChange = ({ target: { value } }) => {
		setSearchString(value);
	};

	return (
		<form onSubmit={onSearch}>
			<input
				type="text"
				value={searchString}
				onChange={onQueryChange}
				placeholder="Search for free photos"
			/>
			<button className="search-icon-btn">
				<CiSearch />
			</button>
		</form>
	);
}

SearchInput.propTypes = {
	onSearch: PropTypes.func,
};

export default SearchInput;
