import { useState } from "react";
import PropTypes from "prop-types";
import { createContext } from "react";

export const SearchContext = createContext({
	query: "",
	showModal: false,
	modalImageObj: {},
	onSetQuery: () => {},
	onShowModal: () => {},
	onCloseModal: () => {},
	onImageClick: () => {},
});

function SearchProvider({ children }) {
	const [query, setQuery] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [modalImageInfo, setModalImageInfo] = useState({});

	const onImageClick = imgObj => {
		setModalImageInfo(imgObj);
	};

	const onSetQuery = query => {
		// console.log("ctx onSetQuery :", query);
		setQuery(query);
	};

	const onShowModal = () => {
		setShowModal(true);
	};

	const onCloseModal = () => {
		setShowModal(false);
	};

	return (
		<SearchContext.Provider
			value={{ query, modalImageInfo, showModal, onSetQuery, onImageClick, onShowModal, onCloseModal }}>
			{children}
		</SearchContext.Provider>
	);
}

SearchProvider.propTypes = {
	children: PropTypes.element,
};

export default SearchProvider;
