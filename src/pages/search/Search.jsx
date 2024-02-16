import { useState, useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { fetchSearchedImages } from "../../services/apiService";
import InfiniteScroll from "react-infinite-scroller";
import { MediaType, RelatedCategories } from "../../utils/constants";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "./Search.scss";
import Navbar from "../../components/common/navbar/Navbar";
import { BallsLoader } from "../../components/common/loader/Loader";
import Gallery from "../../components/gallery/Gallery";

function Search() {
	console.log('page reloaded');

	const location = useLocation();
	const currentPath = location.pathname;
	const searchQuery = currentPath.split("/").at(-1);

	console.log('searchQuery:', searchQuery);

	const [searchState, setSearchState] = useState({
		searchedImagesInfo: [],
		nextPageLink: null,
		hasMore: true,
		isLoading: false
	});

	const [searchedString, setSearchedString] = useState(searchQuery);

	const categoriesRef = useRef();

	const { searchedImagesInfo, nextPageLink, isLoading, hasMore } = searchState;

	useEffect(() => {
		console.log('effect called..')
		setSearchState({
			searchedImagesInfo: [],
			nextPageLink: null,
			hasMore: true,
			isLoading: false
		});
		setSearchedString(searchQuery);
	}, [searchQuery])

	const fetchImages = useCallback(async () => {
		if (!isLoading && hasMore) {
			try {
				setSearchState(prev => ({ ...prev, isLoading: true }));
				const { photos, next_page } = await fetchSearchedImages(searchedString, nextPageLink);
				setSearchState(prev => ({
					...prev,
					searchedImagesInfo: [...prev.searchedImagesInfo, ...photos],
					hasMore: !!next_page,
					nextPageLink: next_page,
					isLoading: false
				}));
			} catch (error) {
				console.error(error);
			}
		}
	}, [searchedString, isLoading, hasMore, nextPageLink]);

	const fetchCategoryImages = ({ target: { value } }) => {
		console.log('category:', value);
		// const category = value;
		// setSearchState({
		// 	searchedImagesInfo: [],
		// 	nextPageLink: null,
		// 	hasMore: true,
		// 	isLoading: false
		// });
		// setQuery(category);
		// navigate(`/search/${category}`);
	};

	const onScroll = scrollOffset => {
		if (categoriesRef.current) {
			categoriesRef.current.style.transition = "scroll-left 0.5s ease-in-out";
			categoriesRef.current.scrollLeft += scrollOffset;
		}
	};

	const noResultsFound = (
		<h1 className="text-center">
			No results found for <span className="not-found-text">{`"${searchedString}"!!`}</span>
		</h1>
	);

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
					{RelatedCategories.map(category => (
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
				loader={<BallsLoader />}
				threshold={400}>
				<Gallery allFetchedImages={searchedImagesInfo} fetchImages={fetchCategoryImages} type={MediaType.photos} />
			</InfiniteScroll>
			{!searchedImagesInfo.length ? noResultsFound : null}
		</div>
	);
}

export default Search;
