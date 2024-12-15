exports.up = (pgm) => {
  pgm.createTable("books", {
    id: {
      type: "serial",
      primaryKey: true,
    },
    name: {
      type: "varchar(255)",
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("books");
};
