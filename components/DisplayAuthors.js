import AuthorList from './AuthorList';

const DisplayAuthors = ({ authors }) => {
  if (Object.keys(authors).length > 0) {
    return <AuthorList authors={authors} />;
  } else {
    return <p>Authors will appear here.</p>;
  }
};

export default DisplayAuthors;
