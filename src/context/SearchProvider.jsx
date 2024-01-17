import { useState } from "react";
import PropTypes from "prop-types";
import { createContext } from "react";

export const SearchContext = createContext({
	query: "",
	showModal: false,
	modalImageInfo: {},
	onSetQuery: () => {},
	setShowModal: () => {},
	setModalImageInfo: () => {},
});

function SearchProvider({ children }) {
	const [query, setQuery] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [modalImageInfo, setModalImageInfo] = useState({});

	const onSetQuery = (query) => {
		// console.log("ctx onSetQuery :", query);
		setQuery(query);
	};

	return (
		<SearchContext.Provider
			value={{
				query,
				showModal,
				modalImageInfo,
				onSetQuery,
				setModalImageInfo,
				setShowModal,
			}}
		>
			{children}
		</SearchContext.Provider>
	);
}

SearchProvider.propTypes = {
	children: PropTypes.element,
};

export default SearchProvider;
