import { useRouter } from 'next/router';
import { useContext } from 'react';
import AppContext from '../../components/AppContext';
import Head from 'next/head';

const Book = () => {
  const value = useContext(AppContext);
  const router = useRouter();
  const { book } = router.query;
  console.log(value.books[book]);
  console.log(value.books[book][0].authors);
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
};

export default Book;
