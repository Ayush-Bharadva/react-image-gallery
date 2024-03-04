import { PropTypes } from 'prop-types';
import './MediaPage.scss';
import { GoChevronDown } from 'react-icons/go';
import useFetchData from '../../hooks/useFetchData';
import { useCallback, useEffect } from 'react';
import { fetchCuratedPhotos, fetchPopularVideos } from '../../services/fetch-services';
import InfiniteGallery from '../../components/common/infinite-gallery/InfiniteGallery';

function MediaPage({ mediaType }) {

  const mediaFetchFunction = mediaType === 'photos' ? fetchCuratedPhotos : fetchPopularVideos;

  const { data, isLoading, hasMore, fetchData: fetchMedia } =
    useFetchData({
      fetchFunction: mediaFetchFunction,
      type: mediaType,
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
      <InfiniteGallery
        loadMore={loadMore}
        hasMore={hasMore}
        mediaList={data}
        type={mediaType}
      />
    </div>
  )
}

export default MediaPage

MediaPage.propTypes = {
  mediaType: PropTypes.string.isRequired
}