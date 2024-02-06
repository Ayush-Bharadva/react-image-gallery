import { PropTypes } from "prop-types";
import ImageCard from "../components/ImageCard/ImageCard";
import VideoCard from "../components/VideoCard/VideoCard";

function RenderColumn({ column, allItems, onImageSelect, isVideo }) {
	return (
		<div className={`col-${column}`}>
			{allItems[`column${column}`].map((item, index) => {
				return isVideo ? (
					<VideoCard
						key={item.id}
						video={item}
					/>
				) : (
					<ImageCard
						key={item.id}
						image={item}
						index={index}
						column={column}
						onImageClick={onImageSelect}
					/>
				);
			})}
		</div>
	);
}

export default RenderColumn;

RenderColumn.propTypes = {
	column: PropTypes.number,
	allItems: PropTypes.shape({
		column1: PropTypes.arrayOf(PropTypes.object),
		column2: PropTypes.arrayOf(PropTypes.object),
		column3: PropTypes.arrayOf(PropTypes.object)
	}),
	onImageSelect: PropTypes.func,
	isVideo: PropTypes.bool
};
