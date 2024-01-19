import { useContext, useState, useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../context/SearchProvider";
import {
	computeColumnsFromWidth,
	fetchSearchedImages,
} from "../services/services";
import InfiniteScroll from "react-infinite-scroller";
import ImageGallery from "../components/Common/ImageGallery";
import pexelsLogo from "../assets/images/pexels-logo.jpg";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { relatedCategories } from "../helper/constants";
import { calculateColumns } from "../helper/helper";
import SearchInput from "../components/Common/SearchInput";
import "../styles/Global.scss";
import "./SearchPage.scss";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
// import ImageDialog from "../components/Common/ImageDialog";

function SearchPage() {
	const location = useLocation();
	const pathname = location.pathname;
	const navigate = useNavigate();
	const { query, setQuery } = useContext(SearchContext);

	const categoriesRef = useRef();

	const [searchState, setSearchState] = useState({
		searchedImagesInfo: [],
		nextPageLink: null,
		hasMore: true,
		isLoading: false,
	});
	const [columns, setColumns] = useState(1);
	const [searchString, setSearchString] = useState("");
	const onSearchStringChange = ({ target: { value } }) => {
		setSearchString(value);
	};

	const { searchedImagesInfo, nextPageLink, isLoading, hasMore } =
		searchState;

	const onSetPrevQuery = useCallback(() => {
		setSearchState({
			searchedImagesInfo: [],
			nextPageLink: null,
			hasMore: true,
			isLoading: false,
		});
		const temp = pathname.split("/");
		const prevQuery = temp[temp.length - 1];
		setSearchString(prevQuery);
		setQuery(prevQuery);
	}, [pathname, setQuery]);

	const computeColumns = () => {
		const columnCount = calculateColumns();
		setColumns(columnCount);
	};

	const fetchImages = useCallback(async () => {
		// console.log("fetchImages cb :", query, isLoading, hasMore);
		if (!isLoading && hasMore) {
			try {
				setSearchState((prev) => ({ ...prev, isLoading: true }));
				const { photos, next_page } = await fetchSearchedImages(
					query,
					nextPageLink
				);
				setSearchState((prev) => ({
					...prev,
					searchedImagesInfo: [...prev.searchedImagesInfo, ...photos],
					hasMore: !!next_page,
					nextPageLink: next_page,
					isLoading: false,
				}));
			} catch (error) {
				console.error(error);
			}
		}
	}, [query, isLoading, hasMore, nextPageLink]);

	useEffect(() => {
		onSetPrevQuery();
	}, [onSetPrevQuery]);

	useEffect(() => {
		computeColumns();
		window.addEventListener("resize", computeColumns);
		return () => {
			window.removeEventListener("resize", computeColumns);
		};
	}, []);

	const fetchCategoryImages = (event) => {
		const category = event.target.value;
		setSearchState({
			searchedImagesInfo: [],
			nextPageLink: null,
			hasMore: true,
			isLoading: false,
		});
		setQuery(category);
		navigate(`/search/${category}`);
	};

	const computedLayoutColumns = computeColumnsFromWidth(
		searchedImagesInfo,
		columns
	);

	const onSubmitSearch = (event) => {
		event.preventDefault();
		setSearchState({
			searchedImagesInfo: [],
			nextPageLink: null,
			hasMore: true,
			isLoading: false,
		});
		const newQuery = searchString;
		// console.log(!newQuery.trim());
		if (!newQuery.trim()) {
			navigate("/");
			return;
		}
		setQuery(newQuery);
		navigate(`/search/${newQuery}`);
	};

	const onScroll = (scrollOffset) => {
		categoriesRef.current.scrollLeft += scrollOffset;
	};

	const onNavigateToHome = () => {
		navigate("/", { replace: true });
	};

	// const [showModal, setShowModal] = useState(false);

	const loader = <p style={{ textAlign: "center" }}>Loading...</p>;

	return (
		<div id="search-images-container">
			<div className="nav-bar">
				<div className="nav-bar-left">
					<div className="logo" onClick={onNavigateToHome}>
						<img src={pexelsLogo} alt="pexels logo" />
						<span>Pexels</span>
					</div>
					<SearchInput
						searchString={searchString}
						onChange={onSearchStringChange}
						onSubmit={onSubmitSearch}
					/>
				</div>
				<ul className="nav-items nav-bar-right">
					<li>Explore</li>
					<li>License</li>
					<li>
						<button>Upload</button>
					</li>
				</ul>
			</div>
			<div className="related-categories-container" ref={categoriesRef}>
				<FaAngleLeft
					className="move-left-icon"
					onClick={() => onScroll(-100)}
				/>
				<div className="related-categories" ref={categoriesRef}>
					{relatedCategories.map((category, index) => (
						// <li key={index}>
						<button
							key={index}
							onClick={fetchCategoryImages}
							value={category}
						>
							{category}
						</button>
						// </li>
					))}
				</div>
				<FaAngleRight
					className="move-right-icon"
					onClick={() => onScroll(100)}
				/>
			</div>
			<InfiniteScroll
				loadMore={fetchImages}
				hasMore={hasMore}
				loader={loader}
				threshold={500}
			>
				<ImageGallery
					allImages={computedLayoutColumns}
					// key={}
				/>
			</InfiniteScroll>
			{/* <ImageDialog
				// imgObj={imageObj}
				isOpen={showModal}
				onClose={() => setShowModal(false)}
			/> */}
		</div>
	);
}

export default SearchPage;
