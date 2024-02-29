import { PropTypes } from "prop-types";
import InfiniteScroll from "react-infinite-scroller";
import { BallsLoader } from "../loader/Loader";
import Gallery from "../../gallery/Gallery";
import { memo } from "react";

const InfiniteScroller = memo(function InfiniteScroller({ loadMore, hasMore, mediaList, type }) {
  return (
    <InfiniteScroll
      className="infinite-scroll-container"
      loadMore={loadMore}
      hasMore={hasMore}
      initialLoad={false}
      loader={<BallsLoader />}>
      <Gallery
        mediaList={mediaList}
        type={type}
      />
    </InfiniteScroll>
  )
});

export default InfiniteScroller;

InfiniteScroller.propTypes = {
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  mediaList: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired
};