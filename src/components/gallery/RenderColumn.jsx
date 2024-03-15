import { PropTypes } from "prop-types";
import MediaCard from "../common/media-card/MediaCard";

const RenderColumn = ({ mediaColumnItems, onMediaSelect, mediaType }) => {
	return (
		<div className="column">
			{mediaColumnItems.map((media, index) =>
				<MediaCard
					key={`${media.id}-${index}`}
					media={media}
					onSelectMedia={onMediaSelect}
					mediaType={mediaType}
				/>
			)}
		</div>
	);
}

export default RenderColumn;

RenderColumn.propTypes = {
	mediaColumnItems: PropTypes.array,
	onMediaSelect: PropTypes.func,
	mediaType: PropTypes.string
};
