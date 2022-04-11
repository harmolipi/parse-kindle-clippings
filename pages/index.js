import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import {
  readKindleClipping,
  parseKindleEntries,
  organizeKindleEntriesByBookTitle,
  organizeKindleEntriesByAuthors,
} from '@darylserrano/kindle-clippings';
import ClippingsInput from '../components/ClippingsInput';
import DisplayAuthors from '../components/DisplayAuthors';
import Link from 'next/link';

export default function Home() {
  const [clippings, setClippings] = useState([]);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [authorList, setAuthorList] = useState();

  const handleClippingChange = (e) => {
    if (e.target.value === '') {
      setClippings([]);
      setBooks([]);
      setAuthors([]);
      setAuthorList();
    } else {
      try {
        const clippings = readKindleClipping(e.target.value);
        const parsedClippings = parseKindleEntries(clippings);
        const parsedBooks = organizeKindleEntriesByBookTitle(parsedClippings);
        const parsedAuthors = Object.fromEntries(
          organizeKindleEntriesByAuthors(parsedClippings)
        );
        setClippings(parsedClippings);
        setBooks(parsedBooks);
        setAuthors(parsedAuthors);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      <div className="section">
        <Head>
          <title>Kindle Note Parser</title>
          <meta name="description" content="Kindle Note Parser" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="container">
          <main className="main">
            <h1 className="title is-1 has-text-centered">Kindle Note Parser</h1>
            <p className="subtitle is-4 has-text-centered">
              Get started by pasting your &apos;my clippings.txt&apos; file
              below.
            </p>
          </main>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <main className="main">
            <ClippingsInput handleChange={handleClippingChange} />
            <div className="field">
              <label className="label">Output</label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Output will appear here"
                  value={
                    clippings.length > 0
                      ? JSON.stringify(clippings, null, 2)
                      : ''
                  }
                  readOnly
                />
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="section">
        {/* Display list of authors with links to '/authors/[author-name]' if there are any books*/}
        <div className="container">
          <main className="main">
            <h1 className="title is-1 has-text-centered">Books</h1>
            <p className="subtitle is-4 has-text-centered">
              Click on an author to see a list of his books.
            </p>
            <div className="columns is-multiline">
              <DisplayAuthors authors={authors} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
