import { useCallback, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { GoChevronDown } from "react-icons/go";
import "./Home.scss";
import { fetchCuratedPhotos } from "../../services/apiservices";
import { BallsLoader } from "../../components/common/loader/Loader";
import Gallery from "../../components/gallery/Gallery";
import { MediaType } from "../../utils/constants";
import useFetchData from "../../hooks/useFetchData";

function Home() {

	const { data: fetchedPhotos, isLoading, hasMore, fetchData } =
		useFetchData({
			fetchFunction: fetchCuratedPhotos, initialData: [], type: MediaType.photos
		});

	const loadMore = useCallback(() => {
		if (!isLoading && hasMore) {
			fetchData();
		}
	}, [isLoading, hasMore, fetchData]);

	useEffect(() => {
		fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="home-container">
			<div className="heading">
				<h4>Free Stock Photos</h4>
				<button>
					Trending <GoChevronDown />
				</button>
			</div>
			<InfiniteScroll
				className="infinite-scroll-container"
				loadMore={loadMore}
				hasMore={hasMore}
				initialLoad={false}
				loader={<BallsLoader />}>
				<Gallery
					allFetchedImages={fetchedPhotos}
					fetchImages={fetchData}
					type={MediaType.photos}
				/>
			</InfiniteScroll>
		</div>
	);
}

export default Home;
