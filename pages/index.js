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
import Link from 'next/link';

export default function Home() {
  const [clippings, setClippings] = useState();
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  const handleClippingChange = (e) => {
    try {
      const clippings = readKindleClipping(e.target.value);
      const parsedClippings = parseKindleEntries(clippings);
      const parsedBooks = organizeKindleEntriesByBookTitle(parsedClippings);
      const parsedAuthors = organizeKindleEntriesByAuthors(parsedClippings);
      setClippings(parsedClippings);
      setBooks(parsedBooks);
      setAuthors(parsedAuthors);
    } catch (err) {
      console.log(err);
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
                  value={JSON.stringify(clippings, null, 2)}
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
              {Array(authors).map((book) => (
                <div
                  className="column is-one-third"
                  key={book.title || 'title'}
                >
                  <Link
                    href="/authors/[book]"
                    as={`/authors/${book.authors[0] || 'title'}`}
                  >
                    <a>
                      <div className="card">
                        <div className="card-image">
                          <p>Title is here</p>
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
