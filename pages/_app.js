import '../styles/globals.css';
import AppContext from '../components/AppContext';
import { useState } from 'react';

function MyApp({ Component, pageProps }) {
  const [clippings, setClippings] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  return (
    <AppContext.Provider
      value={{ clippings, setClippings, authors, setAuthors, books, setBooks }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
