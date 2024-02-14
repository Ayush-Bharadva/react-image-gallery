import { PropTypes } from "prop-types";
import ImageCard from "../ImageCard/ImageCard";
import VideoCard from "../VideoCard/VideoCard";
import { useEffect, useRef } from "react";

function RenderColumn({
	column,
	allMediaItems,
	onImageSelect,
	onSelectVideo,
	fetchImages,
	fetchVideos,
	isVideo
}) {
	const columnRef = useRef();

	// useEffect(() => {
	// 	function handleScroll() {
	// 		if (columnRef.current && columnRef.current.clientHeight < window.scrollY) {
	// 			if (isVideo) {
	// 				fetchVideos();
	// 			} else {
	// 				fetchImages();
	// 			}
	// 		}
	// 	}

	// 	document.addEventListener("scroll", handleScroll);

	// 	return () => {
	// 		document.removeEventListener("scroll", handleScroll);
	// 	};
	// }, [fetchImages, fetchVideos, isVideo]);

	return (
		<div
			ref={columnRef}
			className={`col-${column}`}>
			{allMediaItems.map((item, index) => {
				return isVideo ? (
					<VideoCard
						key={item.id}
						video={item}
						onVideoSelect={() => onSelectVideo(item.id)}
					/>
				) : (
					<ImageCard
						key={item.id}
						image={item}
						index={index}
						column={column}
						onImageSelect={onImageSelect}
					/>
				);
			})}
		</div>
	);
}

export default RenderColumn;

RenderColumn.propTypes = {
	column: PropTypes.number,
	allMediaItems: PropTypes.array,
	onImageSelect: PropTypes.func,
	onSelectVideo: PropTypes.func,
	fetchImages: PropTypes.func,
	fetchVideos: PropTypes.func,
	isVideo: PropTypes.bool
};
