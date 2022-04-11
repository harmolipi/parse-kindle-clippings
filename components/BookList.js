import Link from 'next/link';

const BookList = ({ books }) => {
  return (
    <ul>
      {Object.keys(books).map((book) => {
        return (
          <li key={book}>
            <Link href="/books/[book]" as={`/books/${book}`}>
              <a>{book}</a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default BookList;
