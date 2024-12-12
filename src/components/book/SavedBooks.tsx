import React, { useState } from 'react';
import { useBook } from '../../context/BookContext';
import { Pencil, Trash2, Save, X } from 'lucide-react';

export const SavedBooks: React.FC = () => {
  const { state, dispatch } = useBook();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<{ title: string; author: string }>({
    title: '',
    author: ''
  });

  const handleEdit = (book: Book) => {
    setEditingId(book.id);
    setEditForm({ title: book.title, author: book.author });
  };

  const handleSave = (book: Book) => {
    dispatch({
      type: 'UPDATE_BOOK',
      payload: { ...book, ...editForm }
    });
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    dispatch({ type: 'REMOVE_BOOK', payload: id });
  };

  if (state.savedBooks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No saved books yet. Try searching and saving some books!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-6">Your Library</h2>
      {state.savedBooks.map((book) => (
        <div key={book.id} className="bg-white p-4 rounded-lg shadow flex gap-4">
          <img
            src={book.cover}
            alt={book.title}
            className="w-24 h-32 object-cover rounded"
          />
          <div className="flex-1">
            {editingId === book.id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="w-full px-2 py-1 border rounded"
                />
                <input
                  type="text"
                  value={editForm.author}
                  onChange={(e) => setEditForm({ ...editForm, author: e.target.value })}
                  className="w-full px-2 py-1 border rounded"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(book)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                  >
                    <Save size={20} />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="p-2 text-gray-600 hover:bg-gray-50 rounded-full"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold">{book.title}</h3>
                <p className="text-gray-600">By {book.author}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleEdit(book)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(book.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};