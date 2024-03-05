import { PropTypes } from "prop-types";
import MediaCard from "../common/media-card/MediaCard";

const RenderColumn = ({ mediaColumnItems, onMediaSelect, mediaType }) => {
	return (
		<div className="column">
			{mediaColumnItems.map((media) =>
				<MediaCard
					key={media.id}
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
