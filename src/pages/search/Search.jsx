import { useLocation } from "react-router-dom";
import "./Search.scss";
import InfiniteScroll from "react-infinite-scroller";
import Gallery from "../../components/gallery/Gallery";
import { fetchSearchedImages } from "../../services/apiservices";
import { MediaType } from "../../utils/constants";
import { BallsLoader } from "../../components/common/loader/Loader";
import RelatedCategories from "../../components/common/related-categories/RelatedCategories";
import Header from "../../components/common/header/Header";
import useFetchData from "../../hooks/useFetchData";
import { useCallback } from "react";

function Search() {

	const location = useLocation();
	const searchQuery = location.pathname.split("/").at(-1);

	const { data: fetchedPhotos, isLoading, hasMore, fetchData } =
		useFetchData({
			fetchFunction: fetchSearchedImages,
			initialData: [],
			type: MediaType.photos,
			query: searchQuery
		});

	const loadMore = useCallback(() => {
		if (!isLoading && hasMore) {
			fetchData();
		}
	}, [isLoading, hasMore, fetchData]);

	const noMediaFound = <h1 className="not-found">No Photos found for <span className="not-found-for" > {searchQuery + '..'} </span> </h1>

	return (
		<div className="search-images-container">
			<Header searchQuery={searchQuery} isSearchPage />
			<RelatedCategories />
			<InfiniteScroll
				className="infinite-scroll-container"
				loadMore={loadMore}
				hasMore={hasMore}
				loader={<BallsLoader />}
				initialLoad={false}>
				<Gallery
					allFetchedImages={fetchedPhotos}
					fetchImages={fetchData}
					type={MediaType.photos} />
			</InfiniteScroll>
			{!isLoading && !fetchedPhotos.length ? noMediaFound : null}
		</div>
	);
}

export default Search;
