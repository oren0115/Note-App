import React, { useState } from "react";

const NoteInput = ({ addNote }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const maxTitleLength = 50;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && body) {
      addNote(title, body);
      setTitle("");
      setBody("");
    }
  };

  return (
    <div className="note-input">
      <h2>Buat Catatan</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="judul catatan..."
          value={title}
          maxLength={maxTitleLength}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className="note-input__title__char-limit">
          Sisa karakter: {maxTitleLength - title.length}
        </p>
        <textarea
          placeholder="Isi catatan..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">Buat</button>
      </form>
    </div>
  );
};

export default NoteInput;
