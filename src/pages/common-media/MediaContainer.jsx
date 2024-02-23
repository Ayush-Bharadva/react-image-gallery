import { PropTypes } from 'prop-types';
import './MediaContainer.scss';
import { GoChevronDown } from 'react-icons/go';
import useFetchData from '../../hooks/useFetchData';
import { useCallback, useEffect } from 'react';
import { fetchCuratedPhotos, fetchPopularVideos } from '../../services/fetch-services';
import InfiniteScroller from '../../components/common/InfiniteScroller/InfiniteScroller';

function MediaContainer({ mediaType }) {

  const fetchFn = mediaType === 'photos' ? fetchCuratedPhotos : fetchPopularVideos;

  const { data, isLoading, hasMore, fetchData: fetchMedia } =
    useFetchData({
      fetchFunction: fetchFn, initialData: [], type: mediaType
    });

  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      fetchMedia();
    }
  }, [isLoading, hasMore, fetchMedia]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  return (
    <div className="media-container-wrapper">
      <div className="heading">
        {mediaType === "photos" ? <h4>Free Stock Photos</h4> : <h4>Trending Free Stock Videos</h4>}
        <button>
          Trending <GoChevronDown />
        </button>
      </div>
      <InfiniteScroller
        loadMore={loadMore}
        hasMore={hasMore}
        mediaList={data}
        type={mediaType}
      />
    </div>
  )
}

export default MediaContainer

MediaContainer.propTypes = {
  mediaType: PropTypes.string.isRequired
}