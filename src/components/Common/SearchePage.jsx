import { useContext, useState, useCallback, useEffect } from "react";
import { SearchContext } from "../../context/searchContext";
import { computeColumnsFromWidth, fetchSearchedImages } from "../../services/services";
import InfiniteScroll from "react-infinite-scroller";
import ImageGallery from "./ImageGallery";

function SearchPage() {
	const { query } = useContext(SearchContext);
	console.log(query);

	const [searchState, setSearchState] = useState({
		searchedImagesInfo: [],
		nextPageLink: null,
		hasMore: true,
		isLoading: false,
	});
	const [columns, setColumns] = useState(1);

	const { searchedImagesInfo, nextPageLink, isLoading, hasMore } = searchState;

	const calculateColumns = () => {
		const windowWidth = window.innerWidth;
		if (windowWidth >= 300 && windowWidth < 700) {
			setColumns(1);
		} else if (windowWidth >= 700 && windowWidth < 1100) {
			setColumns(2);
		} else {
			setColumns(3);
		}
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
	}, [nextPageLink, isLoading, hasMore, query]);

	const computedLayoutColumns = computeColumnsFromWidth(searchedImagesInfo, columns);
	// console.log(computedLayoutColumns);

	useEffect(() => {
		calculateColumns();
		window.addEventListener("resize", calculateColumns);
		return () => {
			window.removeEventListener("resize", calculateColumns);
		};
	}, []);

	const loader = <p style={{ textAlign: "center" }}>Loading...</p>;

	return (
		<div id="search-images-container">
			<p>Search Page</p>
			<InfiniteScroll
				loadMore={fetchImages}
				hasMore={hasMore}
				loader={loader}>
				<ImageGallery
					key={Math.random().toString}
					allImages={computedLayoutColumns}
				/>
			</InfiniteScroll>
		</div>
	);
}

export default SearchPage;
