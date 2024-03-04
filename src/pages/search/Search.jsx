import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Search.scss";
import { fetchSearchedImages } from "../../services/fetch-services";
import { MediaType } from "../../utils/constants";
import RelatedCategories from "../../components/common/related-categories/RelatedCategories";
import useFetchData from "../../hooks/useFetchData";
import InfiniteGallery from "../../components/common/infinite-gallery/InfiniteGallery";

const Search = () => {
	const { query } = useParams();

	const { data: photosList, isLoading, hasMore, loadMore, fetchData: fetchPhotos } =
		useFetchData({
			fetchFunction: fetchSearchedImages,
			type: MediaType.photos,
			query: query.trim(),
		});

	useEffect(() => {
		if (!photosList.length && !isLoading && hasMore) {
			fetchPhotos();
		}
	}, [photosList, isLoading, hasMore, fetchPhotos]);

	const noMediaFound = <h1 className="not-found">No Results found for <span className="not-found-for" > {query + '..'} </span> </h1>

	return (
		<div className="search-images-container">
			<RelatedCategories />
			{!isLoading && !hasMore && !photosList.length ? noMediaFound :
				<InfiniteGallery
					loadMore={loadMore}
					hasMore={hasMore}
					mediaList={photosList}
					mediaType={MediaType.photos}
				/>}
		</div>
	);
}
export default Search;
