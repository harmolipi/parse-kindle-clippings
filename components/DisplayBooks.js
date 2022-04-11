import BookList from './BookList';

const DisplayBooks = ({ books }) => {
  console.log(books);
  if (Object.keys(books).length > 0) {
    return <BookList books={books} />;
  } else {
    return <p>Books will appear here after pasting in your clippings above.</p>;
  }
};

export default DisplayBooks;
