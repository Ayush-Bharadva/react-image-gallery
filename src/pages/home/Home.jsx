import { useCallback, useEffect } from "react";
// import InfiniteScroll from "react-infinite-scroller";
import { GoChevronDown } from "react-icons/go";
import "./Home.scss";
import { fetchCuratedPhotos } from "../../services/fetch-services";
// import { BallsLoader } from "../../components/common/loader/Loader";
// import Gallery from "../../components/gallery/Gallery";
import { MediaType } from "../../utils/constants";
import useFetchData from "../../hooks/useFetchData";
import InfiniteScroller from "../../components/common/InfiniteScroller/InfiniteScroller";

function Home() {

	const { data: curatedPhotos, isLoading, hasMore, fetchData } =
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
	}, [fetchData]);

	return (
		<div className="home-container">
			<div className="heading">
				<h4>Free Stock Photos</h4>
				<button>
					Trending <GoChevronDown />
				</button>
			</div>
			<InfiniteScroller loadMore={loadMore} hasMore={hasMore} mediaList={curatedPhotos} />
			{/* <InfiniteScroll
				className="infinite-scroll-container"
				loadMore={loadMore}
				hasMore={hasMore}
				initialLoad={false}
				loader={<BallsLoader />}>
				<Gallery
					fetchedMedia={curatedPhotos}
					type={MediaType.photos}
				/>
			</InfiniteScroll> */}
		</div>
	);
}

export default Home;
