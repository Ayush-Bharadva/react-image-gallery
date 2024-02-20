import { useCallback, useEffect } from "react";
import { fetchPopularVideos } from "../../services/apiservices";
import { BallsLoader } from "../../components/common/loader/Loader";
import InfiniteScroll from "react-infinite-scroller";
import "./Videos.scss";
import { GoChevronDown } from "react-icons/go";
import Gallery from "../../components/gallery/Gallery";
import { MediaType } from "../../utils/constants";
import useFetchData from "../../hooks/useFetchData";

function Videos() {

	const { data: fetchedVideos, isLoading, hasMore, fetchData } =
		useFetchData({
			fetchFunction: fetchPopularVideos, initialData: [], type: MediaType.videos
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
		<div className="videos-container">
			<div className="heading">
				<h4>Trending Free Stock Videos</h4>
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
					allFetchedVideos={fetchedVideos}
					fetchVideos={fetchData}
					type={MediaType.videos}
				/>
			</InfiniteScroll>
		</div>
	);
}

export default Videos;
