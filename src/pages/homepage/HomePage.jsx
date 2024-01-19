import { useState, useCallback, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { computeColumnsFromWidth, fetchCuratedImages } from "../../services/services";
import { calculateColumns } from "../../helper/helper";
import ImageGallery from "../../components/Common/ImageGallery";
import { GoChevronDown } from "react-icons/go";
import "./HomePage.scss";
import "../../styles/Global.scss";

const curatedImgUrl = "https://api.pexels.com/v1/curated";

function HomePage() {
	const [fetchedImagesInfo, setFetchedImagesInfo] = useState({
		fetchedImages: [],
		nextPageUrl: curatedImgUrl,
		hasMore: true,
		isLoading: false,
	});
	const [columns, setColumns] = useState(1);

	const { fetchedImages, nextPageUrl, hasMore, isLoading } = fetchedImagesInfo;

	const computeColumns = () => {
		const columnsCount = calculateColumns();
		setColumns(columnsCount);
	};

	const fetchImages = useCallback(async () => {
		if (!isLoading && hasMore) {
			try {
				setFetchedImagesInfo(prev => ({ ...prev, isLoading: true }));
				const { photos, next_page } = await fetchCuratedImages(nextPageUrl);
				// console.log(photos, next_page);
				setFetchedImagesInfo(prev => ({
					...prev,
					fetchedImages: [...prev.fetchedImages, ...photos],
					nextPageUrl: next_page,
					isLoading: false,
					hasMore: !!next_page,
				}));
			} catch (error) {
				throw new Error(error);
			}
		}
	}, [isLoading, nextPageUrl, hasMore]);

	const computedImageColumns = computeColumnsFromWidth(fetchedImages, columns);

	useEffect(() => {
		computeColumns();
		window.addEventListener("resize", computeColumns);
		return () => {
			window.removeEventListener("resize", computeColumns);
		};
	}, []);

	const loader = <p style={{ textAlign: "center" }}>Loading...</p>;

	return (
		<div id="home-container">
			<div className="heading">
				<h1>Free Stock Photos</h1>
				<button>
					Trending <GoChevronDown />{" "}
				</button>
			</div>
			<InfiniteScroll
				className="infinite-scroll-container"
				key={Math.random().toString()}
				loadMore={fetchImages}
				hasMore={hasMore}
				loader={loader}
				threshold={400}>
				<ImageGallery allImages={computedImageColumns} />
			</InfiniteScroll>
		</div>
	);
}

export default HomePage;
