module.exports = {
  development: {
    // HOST: "localhost",
    // USER: "root",
    // PASSWORD: "qwerty",
    HOST: "10.0.1.210",
    USER: "miro",
    PASSWORD: "1234",
    DB: "helpdesk",
    DIALECT: "mariadb",
    PORT: "3306",
    POOL: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
