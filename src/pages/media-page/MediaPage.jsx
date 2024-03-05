import { PropTypes } from 'prop-types';
import './MediaPage.scss';
import { GoChevronDown } from 'react-icons/go';
import useFetchData from '../../hooks/useFetchData';
import { fetchCuratedPhotos, fetchPopularVideos } from '../../services/fetch-services';
import InfiniteGallery from '../../components/common/infinite-gallery/InfiniteGallery';
import { useMemo } from 'react';
import { MediaPageTitles } from '../../utils/constants';

const MediaPage = ({ mediaType }) => {

  const mediaFetchFunction = useMemo(() => {
    return mediaType === 'photos' ? fetchCuratedPhotos : fetchPopularVideos;
  }, [mediaType]);

  const { data, hasMore, loadMore } = useFetchData({ fetchFunction: mediaFetchFunction, type: mediaType });

  return (
    <div className="media-container-wrapper">
      <div className="heading">
        <h4>{MediaPageTitles[mediaType]}</h4>
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