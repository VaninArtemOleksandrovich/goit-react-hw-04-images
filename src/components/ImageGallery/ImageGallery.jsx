import { useState, useEffect } from 'react';
import { Loader } from '../Loader/Loader';
import { getImage } from 'api/getDataImage';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button';
import PropTypes from 'prop-types';

import css from './ImageGallery.module.css';

const pageStatus = {
  INIT: 'init',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const ImageGallery = ({ value, onClick }) => {
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState(pageStatus.INIT);



  useEffect(() => {
    setStatus(pageStatus.LOADING);

    async function getData() {
      try {
        const data = await getImage(value);
        setImages(data);
        setStatus(pageStatus.SUCCESS);
      } catch {
        setStatus(pageStatus.ERROR);
      }
    }
    getData();
  
  }, []);

 

  useEffect(() => {
    async function getData() {
      const newData = await getImage(value);
      setImages(newData);
    }
    getData();
  }, [value]);

  useEffect(() => {
    if (page > 1) {
      async function getData() {
        const newPage = await getImage(value, page);
        setImages(prevImages => [...prevImages, ...newPage]);
      }
      getData();
    }
    
  }, [page]);

  

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <>
      {status === pageStatus.ERROR && <p>ERROOOOOOR</p>}

      {(status === pageStatus.LOADING || status === pageStatus.INIT) && (
        <Loader />
      )}

      {status === pageStatus.SUCCESS && (
        <ul className={css.ImageGallery}>
          {images?.map(item => {
            return (
              <ImageGalleryItem
                key={item.webformatURL}
                url={item.webformatURL}
                onClick={onClick}
                bigImage={item.largeImageURL}
              />
            );
          })}
        </ul>
      )}
      {images.length >= 12 && <Button onClick={handleLoadMore} />}
    </>
  );
};

ImageGallery.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
