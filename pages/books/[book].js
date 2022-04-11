import { useRouter } from 'next/router';
import { useContext } from 'react';
import AppContext from '../../components/AppContext';
import Head from 'next/head';
import Link from 'next/link';

const Book = () => {
  const value = useContext(AppContext);
  const router = useRouter();
  const { book } = router.query;
  if (value.books[book] === undefined) {
    console.log(book);
    return (
      <>
        <Head>
          <title>Kindle Note Parser</title>
          <meta name="description" content="Kindle Note Parser" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div className="section">
          <div className="container">
            <main className="main">
              <div className="container">
                <p>
                  <Link href="/">
                    <a>Books not yet loaded! Click here to load your books.</a>
                  </Link>
                </p>
              </div>
            </main>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <section className="section">
        <Head>
          <title>{book}</title>
          <meta name="description" content={`${book} notes`} />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h1 className="title is-1">{book}</h1>
        <h2 className="subtitle is-2">{value.books[book][0].authors}</h2>
        <div className="container">
          <div className="columns is-multiline">
            {value.books[book]
              .filter(
                (clipping) =>
                  clipping.content !== 'No content' &&
                  clipping.type === 'HIGHLIGHT'
              )
              .sort((a, b) => a.page - b.page)
              .map((clipping) => {
                return (
                  <div key={clipping} className="column is-one-third box">
                    <div className="card-content">{clipping.content}</div>
                    <div className="card-footer">
                      <div className="card-footer-item">
                        <p>Page {clipping.page}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>
    );
  }
};

export default Book;
