import { PropTypes } from "prop-types";
import RenderColumn from "../RenderColumn";

function VideoGallery({ allVideos }) {
	const { column1, column2, column3 } = allVideos;

	return (
		<div className="video-gallery-container">
			{column1 && (
				<RenderColumn
					column={1}
					allItems={allVideos}
					isVideo
				/>
			)}
			{column2 && (
				<RenderColumn
					column={2}
					allItems={allVideos}
					isVideo
				/>
			)}
			{column3 && (
				<RenderColumn
					column={3}
					allItems={allVideos}
					isVideo
				/>
			)}
		</div>
	);
}

export default VideoGallery;

VideoGallery.propTypes = {
	allVideos: PropTypes.shape({
		column1: PropTypes.arrayOf(PropTypes.object),
		column2: PropTypes.arrayOf(PropTypes.object),
		column3: PropTypes.arrayOf(PropTypes.object)
	})
};
