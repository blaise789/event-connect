import React from 'react';
import HeaderBar from './HeaderBar';
import Searchbar from './Searchbar';
import SearchDisplay from './SearchDisplay';
import MissingBody from './SubComponents/MissingBody'
import Footer from './Footer';

const Missing = () => {
  return (
    <div>
        <HeaderBar />
        <Searchbar />
        <MissingBody />
        <Footer />
    </div>
  )
}

export default Missing