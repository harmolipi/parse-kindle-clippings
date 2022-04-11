import Head from 'next/head';
import ClippingsInput from '../components/ClippingsInput';
import DisplayBooks from '../components/DisplayBooks';
import { useContext } from 'react';
import AppContext from '../components/AppContext';

export default function Home() {
  const value = useContext(AppContext);
  console.log(value.clippings);

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
            <ClippingsInput />
            <div className="field">
              <label className="label">JSON</label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Output will appear here"
                  value={
                    value.clippings.length > 0
                      ? JSON.stringify(value.clippings, null, 2)
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
        <div className="container">
          <main className="main">
            <h1 className="title is-1 has-text-centered">Books</h1>
            <p className="subtitle is-4 has-text-centered">
              Click on a book to see its highlights.
            </p>
            <div className="columns is-multiline">
              <DisplayBooks books={value.books} />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
