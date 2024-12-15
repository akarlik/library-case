exports.up = (pgm) => {
    pgm.createTable('user_book_borrow', {
      id: {
        type: 'serial', 
        primaryKey: true, 
      },
      user_id: {
        type: 'integer', 
        notNull: true, 
      },
      book_id: {
        type: 'integer', 
        notNull: true, 
      },
      borrow_date: {
        type: 'timestamp', 
        notNull: true, 
        default: pgm.func('current_timestamp'),
      },
      return_date: {
        type: 'timestamp', 
      },
      score: {
        type: 'integer', 
      },
    });
  
    pgm.addConstraint('user_book_borrow', 'fk_user_id', {
      foreignKeys: {
        columns: 'user_id',
        references: 'users(id)',
        onDelete: 'CASCADE', 
      },
    });
  
    pgm.addConstraint('user_book_borrow', 'fk_book_id', {
      foreignKeys: {
        columns: 'book_id',
        references: 'books(id)',
        onDelete: 'CASCADE', 
      },
    });
  };
  
  exports.down = (pgm) => {
    pgm.dropTable('user_book_borrow'); 
  };
  