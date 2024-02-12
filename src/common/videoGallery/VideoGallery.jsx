import { PropTypes } from "prop-types";
import RenderColumn from "../RenderColumn";
import useModal from "../../hooks/useModal";
import { useCallback, useContext, useEffect } from "react";
import VideoModal from "../modal/VideoModal";
import { MainContext } from "../../context/MainProvider";

function VideoGallery({ allVideos, allFetchedVideos }) {
	const { column1, column2, column3 } = allVideos;

	const { isShowing: showVideoModal, toggle: toggleVideoModal } = useModal();

	const { setModalVideo } = useContext(MainContext);

	useEffect(() => {
		if (showVideoModal) {
			document.body.classList.add("overflow-hidden");
		}
		return () => {
			document.body.classList.remove("overflow-hidden");
		};
	}, [showVideoModal]);

	const onVideoSelect = videoId => {
		const videoSelected = allFetchedVideos.find(video => video.id === videoId);
		// if (videoSelected) {
		setModalVideo(videoSelected);
		// }
		toggleVideoModal();
	};

	const handleVideoNavigation = useCallback(
		(currentId, dir) => {
			const currentVideoIndex = allFetchedVideos.findIndex(video => video.id === currentId);
			// console.log("currentVideoIndex :", currentVideoIndex);
			console.log("newVideoIndex :", currentVideoIndex + dir);
			const newVideo = allFetchedVideos.at(currentVideoIndex + dir);
			console.log("newVideoObj :", newVideo);
			setModalVideo(newVideo);
		},
		[allFetchedVideos, setModalVideo]
	);

	return (
		<>
			<div className="video-gallery-container">
				{column1 && (
					<RenderColumn
						column={1}
						allItems={allVideos}
						onSelect={onVideoSelect}
						isVideo
					/>
				)}
				{column2 && (
					<RenderColumn
						column={2}
						allItems={allVideos}
						onSelect={onVideoSelect}
						isVideo
					/>
				)}
				{column3 && (
					<RenderColumn
						column={3}
						allItems={allVideos}
						onSelect={onVideoSelect}
						isVideo
					/>
				)}
			</div>
			{showVideoModal && (
				<VideoModal
					isShowing={showVideoModal}
					hide={toggleVideoModal}
					handleVideoNavigation={handleVideoNavigation}
					// selectedVideo={selectedVideo}
				/>
			)}
		</>
	);
}

export default VideoGallery;

VideoGallery.propTypes = {
	allVideos: PropTypes.shape({
		column1: PropTypes.arrayOf(PropTypes.object),
		column2: PropTypes.arrayOf(PropTypes.object),
		column3: PropTypes.arrayOf(PropTypes.object)
	}),
	allFetchedVideos: PropTypes.array
};
