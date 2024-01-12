import { useState, useCallback, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { computeColumnsFromWidth, fetchCuratedImages } from "../../services/services";
import "./HomePage.scss";
import ImageGallery from "../../components/Common/ImageGallery";

// computeColumnsFromWidth([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 3);

const curatedImgUrl = "https://api.pexels.com/v1/curated";

function HomePage() {
	// const [allImages, setAllImages] = useState({ column1: [], column2: [], column3: [] });
	const [allFetchedImages, setAllFetchedImages] = useState([]);
	const [nextPageUrl, setNextPageUrl] = useState(curatedImgUrl);
	const [isLoading, setIsLoading] = useState(false);
	const [columns, setColumns] = useState(1);

	const calculateColumns = () => {
		// console.log("calc");
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
		if (!isLoading) {
			try {
				setIsLoading(true);
				const { photos, next_page } = await fetchCuratedImages(nextPageUrl);
				// console.log(photos, next_page);
				setAllFetchedImages(prev => [...prev, ...photos]);
				setNextPageUrl(next_page);
				setIsLoading(false);
			} catch (error) {
				throw new Error(error);
			}
		}
	}, [isLoading, nextPageUrl]);

	const computedImageColumns = computeColumnsFromWidth(allFetchedImages, columns);

	useEffect(() => {
		calculateColumns();
		window.addEventListener("resize", calculateColumns);
	}, []);

	const hasMore = !!nextPageUrl;
	const loader = <p style={{ textAlign: "center" }}>Loading...</p>;

	return (
		<div className="home-container">
			<InfiniteScroll
				// key={Math.random.toString()}
				loadMore={fetchImages}
				hasMore={hasMore}
				loader={loader}
				threshold={400}>
				<ImageGallery
					key={Math.random().toString}
					allImages={computedImageColumns}
				/>
			</InfiniteScroll>
			{/* <Each
				of={allFetchedImages}
				render={(item, index) => <li>{`${index} : ${item.title}`}</li>}
			/> */}
		</div>
	);
}

export default HomePage;
