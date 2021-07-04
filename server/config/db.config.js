module.exports = {
  development: {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "qwerty",
    DB: "helpdesk",
    DIALECT: "mariadb",
    PORT: "3307",
    POOL: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
