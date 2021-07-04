const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const dbConfig = require("../config/db.config")[env];
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.DIALECT,
  pool: {
    max: dbConfig.POOL.max,
    min: dbConfig.POOL.min,
    acquire: dbConfig.POOL.acquire,
    idle: dbConfig.POOL.idle,
  },
});

const path = require("path");
const fs = require("fs");
const basename = path.basename(__filename);

const db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    db[file.split(".")[0]] = require(`./${file}`)(sequelize, Sequelize);
  });

db.categories.hasMany(db.subcategories);

db.subcategories.hasMany(db.articles);

db.subcategories.belongsTo(db.categories, {
  foreignKey: "categoryId",
});

db.articles.belongsTo(db.subcategories, {
  foreignKey: "subcategoryId",
});

db.articles.belongsTo(db.users, {
  foreignKey: "authorId",
});

db.tokens.belongsTo(db.users, {
  foreignKey: "userId",
});

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
