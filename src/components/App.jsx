import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { fetchPhotos } from 'service/api';
import {Searchbar} from './Searchbar/Searchbar';
import {ImageGallery} from './ImageGallery/ImageGallery';
import {Button} from './Button/Button';
import {Loader} from './Loader/Loader';
import {Modal} from './Modal/Modal';

export const App =() => {
  
  const  [searchQuery,setSearchQuery] = useState('');
  const  [photos,setPhotos] = useState([]);
  const [page,setPage]= useState(1);
  const [isLoading,setIsLoading] = useState(false);
  const [modalImage,setModalImage] = useState('');
  const [showModal,setShowModal] = useState(false);
  const [totalHits,setTotalHits]= useState('');



  useEffect(() => {
    if (searchQuery === '') {
      return;
    }
    setIsLoading(true);
    getPhotos();
  },[page,searchQuery])
  async function getPhotos() {
    try {
      const response = await fetchPhotos(searchQuery, page);
      const arrayPhotos =  () =>
      response.data.hits.map(({ id, webformatURL: image, largeImageURL: modalImage }) => ({
       id,
       image,
       modalImage,
     }));
    setPhotos (prevState => ([...prevState, ...arrayPhotos()]));
    setTotalHits(response.data.totalHits)
      if (!response.data.hits.length) {
        return Promise.reject(
          new Error(
            toast.error(
              'There is no images'
            )
          )
        );
      } else if ( page=== 1) {
        toast.success(`There is some images`);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
    }
  }


  const handleFormSubmit = searchData => {
    setSearchQuery(searchData);
    if(searchData!==searchQuery){
    setPhotos([]);
    setPage(1)}
  };

  const loadMore = () => {
    setPage(prevState => (prevState + 1));
  };

  const openModal = data => {
    setModalImage(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setModalImage(null);
    setShowModal(false);
  };

 
    return (
      <>
        <Searchbar onSubmitForm={handleFormSubmit} />
        <ImageGallery photos={photos} openModal={openModal} />
        {showModal && <Modal image={modalImage} closeModal={closeModal} />}
        {isLoading && <Loader />}
        {<Button handleClick={loadMore} totalHits={totalHits} photos={photos} />}
        <ToastContainer autoClose={1488} />
      </>
    );
  
}