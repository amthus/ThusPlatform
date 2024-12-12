import { Book } from '../types';

const OPEN_LIBRARY_API = 'https://openlibrary.org';

export async function searchBooks(query: string, page: number = 1): Promise<{
  books: Book[];
  total: number;
}> {
  const limit = 10;
  const offset = (page - 1) * limit;
  
  const response = await fetch(
    `${OPEN_LIBRARY_API}/search.json?q=${encodeURIComponent(query)}&limit=${limit}&offset=${offset}`
  );
  
  const data = await response.json();
  
  const books: Book[] = data.docs.map((doc: any) => ({
    id: doc.key.replace('/works/', ''),
    title: doc.title,
    author: doc.author_name?.[0] || 'Unknown Author',
    cover: doc.cover_i 
      ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
      : 'https://via.placeholder.com/200x300?text=No+Cover',
    description: doc.first_sentence?.[0] || 'No description available',
    isbn: doc.isbn?.[0] || ''
  }));

  return {
    books,
    total: data.numFound
  };
}