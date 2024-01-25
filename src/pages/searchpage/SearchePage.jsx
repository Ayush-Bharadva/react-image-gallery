import { useContext, useState, useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ImageContext } from "../../context/SearchProvider";
import { fetchSearchedImages } from "../../services/services";
import InfiniteScroll from "react-infinite-scroller";
import ImageGallery from "../../components/Common/Imagegallery/ImageGallery";
import { relatedCategories } from "../../constants/constants";
import { calculateColumns, computeColumnsFromWidth } from "../../helper/helper";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "./SearchPage.scss";
import Navbar from "../../components/Common/navbar/Navbar";
// import Modal from "../../components/Common/modal/Modal";

function SearchPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const pathname = location.pathname;

	const [searchState, setSearchState] = useState({
		searchedImagesInfo: [],
		nextPageLink: null,
		hasMore: true,
		isLoading: false,
	});
	const [columns, setColumns] = useState(1);
	const { query, setQuery } = useContext(ImageContext);
	const categoriesRef = useRef();
	const { searchedImagesInfo, nextPageLink, isLoading, hasMore } = searchState;

	const onSetPrevQuery = useCallback(() => {
		setSearchState({
			searchedImagesInfo: [],
			nextPageLink: null,
			hasMore: true,
			isLoading: false,
		});
		const temp = pathname.split("/");
		const prevQuery = temp[temp.length - 1];
		setQuery(prevQuery);
	}, [pathname, setQuery]);

	const computeColumns = () => {
		const columnCount = calculateColumns();
		setColumns(columnCount);
	};

	const fetchImages = useCallback(async () => {
		if (!isLoading && hasMore) {
			try {
				setSearchState(prev => ({ ...prev, isLoading: true }));
				const { photos, next_page } = await fetchSearchedImages(query, nextPageLink);
				setSearchState(prev => ({
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

	const fetchCategoryImages = event => {
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

	const computedLayoutColumns = computeColumnsFromWidth(searchedImagesInfo, columns);

	const onScroll = scrollOffset => {
		if (categoriesRef.current) {
			categoriesRef.current.style.transition = "scroll-left 0.5s ease-in-out";
			categoriesRef.current.scrollLeft += scrollOffset;
		}
	};

	const loader = <p style={{ textAlign: "center" }}>Loading...</p>;

	return (
		<div id="search-images-container">
			<Navbar />
			<div className="related-categories-container">
				<FaAngleLeft
					className="move-left-icon"
					onClick={() => onScroll(-500)}
				/>
				<div
					className="related-categories"
					ref={categoriesRef}>
					{relatedCategories.map((category, index) => (
						<button
							key={`${category}-${index}`}
							onClick={fetchCategoryImages}
							value={category}>
							{category}
						</button>
					))}
				</div>
				<FaAngleRight
					className="move-right-icon"
					onClick={() => onScroll(500)}
				/>
			</div>
			<InfiniteScroll
				className="infinite-scroll-container"
				key={Math.random().toString()}
				loadMore={fetchImages}
				hasMore={hasMore}
				loader={loader}
				threshold={500}>
				<ImageGallery allImages={computedLayoutColumns} />
			</InfiniteScroll>
		</div>
	);
}

export default SearchPage;
