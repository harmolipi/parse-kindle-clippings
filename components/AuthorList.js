import Link from 'next/link';

const AuthorList = ({ authors }) => {
  return (
    <ul>
      {Object.keys(authors).map((author) => {
        return <li key={author}>{author}</li>;
      })}
    </ul>
  );
};

export default AuthorList;
