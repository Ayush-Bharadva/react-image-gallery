import { PropTypes } from "prop-types";
import ImageCard from "../common/image-card/ImageCard";
import VideoCard from "../common/video-card/VideoCard";

function RenderColumn({
	column,
	allMediaItems,
	onImageSelect,
	onVideoSelect,
	type
}) {

	return (
		<div
			className={`col-${column}`}>
			{allMediaItems.map((item, index) => {
				return type === "videos" ? (
					<VideoCard
						key={item.id}
						video={item}
						onVideoSelect={() => onVideoSelect(item.id)}
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
	onVideoSelect: PropTypes.func,
	type: PropTypes.string
};
