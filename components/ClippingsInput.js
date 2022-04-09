const ClippingsInput = ({ handleChange }) => (
  <div className="field">
    <label className="label">Clippings File</label>
    <div className="control">
      <textarea
        className="textarea"
        placeholder="Paste your clippings file here"
        onChange={handleChange}
      />
    </div>
  </div>
);

export default ClippingsInput;
