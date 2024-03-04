import { PropTypes } from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import { BallsLoader } from "../loader/Loader";
import Gallery from "../../gallery/Gallery";
import { memo } from "react";

const InfiniteGallery = memo(function InfiniteGallery({ loadMore, hasMore, mediaList, mediaType }) {
  return (
    <InfiniteScroll
      className="infinite-scroll-container"
      loadMore={loadMore}
      hasMore={hasMore}
      initialLoad={false}
      loader={<BallsLoader />}>
      <Gallery
        mediaList={mediaList}
        mediaType={mediaType}
      />
    </InfiniteScroll>
  )
});

export default InfiniteGallery;

InfiniteGallery.propTypes = {
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  mediaList: PropTypes.array.isRequired,
  mediaType: PropTypes.string.isRequired
};