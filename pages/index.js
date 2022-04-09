import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import {
  readKindleClipping,
  parseKindleEntries,
} from '@darylserrano/kindle-clippings';

export default function Home() {
  const [clippings, setClippings] = useState();

  const handleClippingChange = (e) => {
    try {
      const clippings = readKindleClipping(e.target.value);
      const parsedClippings = parseKindleEntries(clippings);
      setClippings(parsedClippings);
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
              Get started by pasting your 'my clippings.txt' file below.
            </p>
          </main>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <main className="main">
            <div className="field">
              <label className="label">Clippings File</label>
              <div className="control">
                <textarea
                  className="textarea"
                  placeholder="Paste your clippings file here"
                  onChange={handleClippingChange}
                />
              </div>
            </div>
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
    </>
  );
}
