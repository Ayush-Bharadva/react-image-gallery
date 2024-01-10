import { useState, useCallback, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
// import Masonry from "react-masonry-css";
import { fetchImagesData } from "../../services/services";
import Image from "../../components/Image/Image";
import "./HomePage.scss";
import ImageGallery from "../../components/ImageGallery";

const imgUrl = "https://api.pexels.com/v1/search/?page=1&query=nature";

function HomePage() {
	const [images, setImages] = useState({ column1: [], column2: [], column3: [] });
	const [nextPageUrl, setNextPageUrl] = useState(imgUrl);
	const [isLoading, setIsLoading] = useState(false);

	const fetchImages = useCallback(async () => {
		if (!isLoading) {
			try {
				setIsLoading(true);
				const { photos, next_page } = await fetchImagesData(nextPageUrl);
				// console.log(photos, next_page);
				const { column1, column2, column3 } = photos.reduce(
					(ans, obj, index) => {
						if (index % 3 === 0) {
							ans.column1.push(obj);
						} else if (index % 3 === 1) {
							ans.column2.push(obj);
						} else {
							ans.column3.push(obj);
						}
						return ans;
					},
					{ column1: [], column2: [], column3: [] }
				);
				setImages(prev => ({ column1: [...prev.column1, ...column1], column2: [...prev.column2, ...column2], column3: [...prev.column3, ...column3] }));
				setNextPageUrl(next_page);
				setIsLoading(false);

				//divide images
			} catch (error) {
				throw new Error(error);
				// console.log(error);
			}
			// insertImagesInColumns(images);
		}
	}, [isLoading, nextPageUrl]);

	// console.log(images.length);
	const hasMore = !!nextPageUrl;
	const loader = <p style={{ textAlign: "center" }}>Loading...</p>;

	// const breakPoints = {
	// 	default: 3,
	// 	1100: 2,
	// 	700: 1,
	// };

	return (
		<div className="main-container">
			<InfiniteScroll
				loadMore={fetchImages}
				hasMore={hasMore}
				loader={loader}>
				<ImageGallery allImages={images} />
			</InfiniteScroll>
		</div>
	);
}

export default HomePage;
