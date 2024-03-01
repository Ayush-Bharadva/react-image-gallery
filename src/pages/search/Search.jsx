import { useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Search.scss";
import { fetchSearchedImages } from "../../services/fetch-services";
import { MediaType } from "../../utils/constants";
import RelatedCategories from "../../components/common/related-categories/RelatedCategories";
import useFetchData from "../../hooks/useFetchData";
import InfiniteGallery from "../../components/common/infinite-gallery/InfiniteGallery";

function Search() {

	const location = useLocation();
	const searchQuery = location.pathname.split("/").at(-1);

	const { data: photosList, isLoading, hasMore, controller, fetchData: fetchPhotos } =
		useFetchData({
			fetchFunction: fetchSearchedImages,
			initialData: [],
			type: MediaType.photos,
			query: searchQuery.trim(),
		});

	const loadMore = useCallback(() => {
		if (!isLoading && hasMore) {
			fetchPhotos();
		}
	}, [isLoading, hasMore, fetchPhotos]);

	useEffect(() => {
		// const controller = new AbortController();
		if (!photosList.length && !isLoading && hasMore) {
			// fetchPhotos(controller);
			fetchPhotos();
		}
		// return () => {
		// 	// console.log("unmounting");
		// 	controller.abort();
		// };
	}, [photosList, isLoading, hasMore, fetchPhotos, controller]);

	const noMediaFound = <h1 className="not-found">No Results found for <span className="not-found-for" > {searchQuery + '..'} </span> </h1>

	return (
		<div className="search-images-container">
			<RelatedCategories />
			<InfiniteGallery
				loadMore={loadMore}
				hasMore={hasMore}
				mediaList={photosList}
				type={MediaType.photos}
			/>
			{!isLoading && !photosList.length ? noMediaFound : null}
		</div>
	);
}

export default Search;
