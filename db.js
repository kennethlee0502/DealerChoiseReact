const Sequelize = require("sequelize");
const { UUID, UUIDV4, STRING, ENUM } = Sequelize.DataTypes;
const sequelize = new Sequelize(
  process.env.DATABASE || "postgres://localhost/workshop"
);

const Thing = sequelize.define("thing", {
  name: {
    type: STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
    },
  },
});

const data = async () => {
  try {
    await sequelize.sync({ force: true });
    await Thing.create({ name: "Always Be Coding" });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  Thing,
  data,
};
