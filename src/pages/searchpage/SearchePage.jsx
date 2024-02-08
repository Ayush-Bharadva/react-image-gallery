import { useContext, useState, useCallback, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ImageContext } from "../../context/ImageProvider";
import { fetchSearchedImages } from "../../services/services";
import InfiniteScroll from "react-infinite-scroller";
import ImageGallery from "../../common/imagegallery/ImageGallery";
import { relatedCategories } from "../../constants/constants";
import { calculateColumns, computeColumnsFromWidth } from "../../helper/helper";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "./SearchPage.scss";
import Navbar from "../../common/navbar/Navbar";

function SearchPage() {
	const navigate = useNavigate();
	const location = useLocation();
	const currentPath = location.pathname;

	const [searchState, setSearchState] = useState({
		searchedImagesInfo: [],
		nextPageLink: null,
		hasMore: true,
		isLoading: false
	});
	const [columns, setColumns] = useState(1);
	const [noImagesFound, setNoImagesFound] = useState(false);

	const categoriesRef = useRef();
	const { query, setQuery } = useContext(ImageContext);

	const { searchedImagesInfo, nextPageLink, isLoading, hasMore } = searchState;

	const onSetPrevQuery = useCallback(() => {
		setSearchState({
			searchedImagesInfo: [],
			nextPageLink: null,
			hasMore: true,
			isLoading: false
		});
		const path = currentPath.split("/");
		const prevQuery = path[path.length - 1];
		setQuery(prevQuery);
	}, [currentPath, setQuery]);

	const computeColumns = () => {
		const columnCount = calculateColumns();
		setColumns(columnCount);
	};

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

	const fetchImages = useCallback(async () => {
		if (!isLoading && hasMore) {
			try {
				setSearchState(prev => ({ ...prev, isLoading: true }));
				const { photos, next_page } = await fetchSearchedImages(query, nextPageLink);
				if (!photos.length) {
					setNoImagesFound(true);
				} else {
					setSearchState(prev => ({
						...prev,
						searchedImagesInfo: [...prev.searchedImagesInfo, ...photos],
						hasMore: !!next_page,
						nextPageLink: next_page,
						isLoading: false
					}));
				}
			} catch (error) {
				console.error(error);
			}
		}
	}, [query, isLoading, hasMore, nextPageLink]);

	const fetchCategoryImages = ({ target: { value } }) => {
		const category = value;
		setSearchState({
			searchedImagesInfo: [],
			nextPageLink: null,
			hasMore: true,
			isLoading: false
		});
		setQuery(category);
		navigate(`/search/${category}`);
	};

	const computedLayoutColumns = computeColumnsFromWidth([...searchedImagesInfo], columns);

	const onScroll = scrollOffset => {
		if (categoriesRef.current) {
			categoriesRef.current.style.transition = "scroll-left 0.5s ease-in-out";
			categoriesRef.current.scrollLeft += scrollOffset;
		}
	};

	const loader = <p style={{ textAlign: "center" }}>Loading...</p>;

	const noImagesFoundElement = noImagesFound ? (
		<h1
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			}}>
			No results found!!
		</h1>
	) : null;

	return (
		<div className="search-images-container">
			<Navbar />
			<div className="related-categories-container">
				<FaAngleLeft
					className="move-left-icon"
					onClick={() => onScroll(-500)}
				/>
				<div
					className="related-categories"
					ref={categoriesRef}>
					{relatedCategories.map(category => (
						<button
							key={category}
							onClick={fetchCategoryImages}
							value={category}>
							{category}
						</button>
					))}
				</div>
				<FaAngleRight
					className="move-right-icon"
					onClick={() => onScroll(300)}
				/>
			</div>
			<InfiniteScroll
				className="infinite-scroll-container"
				loadMore={fetchImages}
				hasMore={hasMore}
				loader={loader}
				threshold={500}>
				<ImageGallery allImages={computedLayoutColumns} />
			</InfiniteScroll>
			{noImagesFoundElement}
		</div>
	);
}

export default SearchPage;
