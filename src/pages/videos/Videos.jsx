import { useCallback, useEffect } from "react";
import { fetchPopularVideos } from "../../services/fetch-services";
import { BallsLoader } from "../../components/common/loader/Loader";
import InfiniteScroll from "react-infinite-scroller";
import "./Videos.scss";
import { GoChevronDown } from "react-icons/go";
import Gallery from "../../components/gallery/Gallery";
import { MediaType } from "../../utils/constants";
import useFetchData from "../../hooks/useFetchData";

function Videos() {

	const { data: popularVideos, isLoading, hasMore, fetchData: retrieveData } =
		useFetchData({
			fetchFunction: fetchPopularVideos, initialData: [], type: MediaType.videos
		});

	const loadMore = useCallback(() => {
		if (!isLoading && hasMore) {
			retrieveData();
		}
	}, [isLoading, hasMore, retrieveData]);

	useEffect(() => {
		retrieveData();
	}, [retrieveData]);

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
					fetchedMedia={popularVideos}
					allFetchedVideos={popularVideos}
					type={MediaType.videos}
				/>
			</InfiniteScroll>
		</div>
	);
}

export default Videos;
