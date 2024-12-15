exports.up = async (pgm) => {
    await pgm.db.query(`
      INSERT INTO users (name) 
      VALUES 
      ('Eray Aslan'),
      ('Enes Faruk Meniz'),
      ('Sefa Eren Şahin'),
      ('Kadir Mutlu');
    `);
  
    await pgm.db.query(`
      INSERT INTO books (name)
      VALUES 
      ('The Hitchhiker''s Guide to the Galaxy'),
      ('I, Robot'),
      ('Dune'),
      ('1984'),
      ('Brave New World');
    `);
  
    await pgm.db.query(`
      INSERT INTO user_book_borrows (user_id, book_id, borrow_date, return_date, score)
      VALUES
      (2, 1, '2024-01-01', '2024-01-10', 5),
      (2, 2, '2024-02-01', '2024-01-10', 10),
      (2, 5, '2024-03-01', NULL, -1),
      (1, 1, '2024-04-01', '2024-01-10', 10);
    `);
  };
  
  exports.down = async (pgm) => {
    await pgm.db.query(`
      DELETE FROM user_book_borrows;
      DELETE FROM books;
      DELETE FROM users;
    `);
  };
  