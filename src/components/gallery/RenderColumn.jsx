import { PropTypes } from "prop-types";
import MediaCard from "../common/media-card/MediaCard";

const RenderColumn = ({ allMediaItems, onMediaSelect, mediaType }) => {
	return (
		<div className="column">
			{allMediaItems.map((media) =>
				<MediaCard
					key={media.id}
					media={media}
					onSelectMedia={onMediaSelect}
					mediaType={mediaType} />
			)}
		</div>
	);
}

export default RenderColumn;

RenderColumn.propTypes = {
	allMediaItems: PropTypes.array,
	onMediaSelect: PropTypes.func,
	mediaType: PropTypes.string
};
