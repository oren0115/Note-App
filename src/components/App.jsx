import React, { useState } from "react";
import NoteInput from "./NoteInput";
import NoteList from "./NoteList";
import { getInitialData, showFormattedDate } from "../utils";

const App = () => {
  const [notes, setNotes] = useState(getInitialData());
  const [searchQuery, setSearchQuery] = useState("");

  const addNote = (title, body) => {
    const newNote = {
      id: Date.now(),
      title,
      body,
      archived: false,
      createdAt: new Date().toISOString(),
    };
    setNotes([...notes, newNote]);
  };

  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const toggleArchive = (id) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    );
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <header className="note-app__header">
        <h1>Notes</h1>
        <input
          type="text"
          placeholder="Cari catatan..."
          className="note-search"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </header>
      <div className="note-app__body">
        <NoteInput addNote={addNote} />
        <h2>Catatan Aktif</h2>
        <NoteList
          notes={filteredNotes.filter((note) => !note.archived)}
          onDelete={deleteNote}
          onArchive={toggleArchive}
          formatDate={showFormattedDate}
        />
        <h2>Catatan Arsip</h2>
        <NoteList
          notes={filteredNotes.filter((note) => note.archived)}
          onDelete={deleteNote}
          onArchive={toggleArchive}
          formatDate={showFormattedDate}
        />
      </div>
    </div>
  );
};

export default App;
