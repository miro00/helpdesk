module.exports = {
  development: {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "qwerty",
    PORT: "3307",
    // HOST: "10.0.1.210",
    // USER: "miro",
    // PASSWORD: "1234",
    // PORT: "3306",
    DB: "helpdesk",
    DIALECT: "mariadb",
    POOL: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
