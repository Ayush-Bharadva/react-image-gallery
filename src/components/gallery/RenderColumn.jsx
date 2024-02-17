import { PropTypes } from "prop-types";
import MediaCard from "../common/media-card/MediaCard";

function RenderColumn({
	allMediaItems,
	onMediaSelect,
	type
}) {

	return (
		<div
			className="column">
			{allMediaItems.map((media) =>
				<MediaCard
					key={media.id}
					media={media}
					onSelectMedia={onMediaSelect}
					type={type} />
			)}
		</div>
	);
}

export default RenderColumn;

RenderColumn.propTypes = {
	allMediaItems: PropTypes.array,
	onMediaSelect: PropTypes.func,
	type: PropTypes.string
};
