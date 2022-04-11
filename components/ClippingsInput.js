import { useContext } from 'react';
import AppContext from '../components/AppContext';
import {
  readKindleClipping,
  parseKindleEntries,
  organizeKindleEntriesByBookTitle,
  organizeKindleEntriesByAuthors,
} from '@darylserrano/kindle-clippings';

const ClippingsInput = () => {
  const value = useContext(AppContext);

  const handleClippingChange = (e) => {
    if (e.target.value === '') {
      value.setClippings([]);
      value.setBooks([]);
      value.setAuthors([]);
    } else {
      try {
        const clippingsInput = readKindleClipping(e.target.value);
        const parsedClippings = parseKindleEntries(clippingsInput);
        const parsedBooks = Object.fromEntries(
          organizeKindleEntriesByBookTitle(parsedClippings)
        );
        const parsedAuthors = Object.fromEntries(
          organizeKindleEntriesByAuthors(parsedClippings)
        );
        console.log(parsedBooks);
        value.setClippings(parsedClippings);
        value.setBooks(parsedBooks);
        value.setAuthors(parsedAuthors);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
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
  );
};

export default ClippingsInput;
