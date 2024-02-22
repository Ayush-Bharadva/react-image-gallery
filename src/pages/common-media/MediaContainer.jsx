import { PropTypes } from 'prop-types';
import { GoChevronDown } from 'react-icons/go';
import InfiniteScroll from 'react-infinite-scroller';
import { BallsLoader } from '../../components/common/loader/Loader';
import Gallery from '../../components/gallery/Gallery';
import useFetchData from '../../hooks/useFetchData';
import { useCallback, useEffect } from 'react';
import { fetchCuratedPhotos, fetchPopularVideos } from '../../services/fetch-services';
import "../home/Home.scss";
import "../videos/Videos.scss";

function MediaContainer({ mediaType }) {

  const fetchFn = mediaType === 'photos' ? fetchCuratedPhotos : fetchPopularVideos;

  // rename fetchData
  const { data, isLoading, hasMore, fetchData } =
    useFetchData({
      fetchFunction: fetchFn, initialData: [], type: mediaType
    });

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchData();
    }
  }, [isLoading, hasMore, fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="home-container">
      <div className="heading">
        {mediaType === "photos" ? <h4>Free Stock Photos</h4> : <h4>Trending Free Stock Videos</h4>}
        <button>
          Trending <GoChevronDown />
        </button>
      </div>
      <InfiniteScroll
        className="infinite-scroll-container"
        loadMore={loadMore}
        hasMore={hasMore}
        initialLoad={false}
        loader={<BallsLoader />}>
        <Gallery
          fetchedMedia={data}
          type={mediaType}
        />
      </InfiniteScroll>
    </div>
  )
}

export default MediaContainer

MediaContainer.propTypes = {
  mediaType: PropTypes.string.isRequired
}