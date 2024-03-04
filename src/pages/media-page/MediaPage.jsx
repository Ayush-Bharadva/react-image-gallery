import { PropTypes } from 'prop-types';
import './MediaPage.scss';
import { GoChevronDown } from 'react-icons/go';
import useFetchData from '../../hooks/useFetchData';
import { useEffect, useMemo } from 'react';
import { fetchCuratedPhotos, fetchPopularVideos } from '../../services/fetch-services';
import InfiniteGallery from '../../components/common/infinite-gallery/InfiniteGallery';

const MediaPage = ({ mediaType }) => {

  const mediaFetchFunction = useMemo(() => {
    return mediaType === 'photos' ? fetchCuratedPhotos : fetchPopularVideos;
  }, [mediaType]);

  const { data, hasMore, loadMore, fetchData: fetchMedia } =
    useFetchData({
      fetchFunction: mediaFetchFunction,
      type: mediaType,
    });

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
        mediaType={mediaType}
      />
    </div>
  )
}

export default MediaPage

MediaPage.propTypes = {
  mediaType: PropTypes.string.isRequired
}