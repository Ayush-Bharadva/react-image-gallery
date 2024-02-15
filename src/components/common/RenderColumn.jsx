import { PropTypes } from "prop-types";
import ImageCard from "../ImageCard/ImageCard";
import VideoCard from "../VideoCard/VideoCard";

function RenderColumn({
	column,
	allMediaItems,
	onImageSelect,
	onSelectVideo,
	isVideo
}) {

	return (
		<div
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
						key={`${item.id}-${index}`}
						image={item}
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
	isVideo: PropTypes.bool
};
