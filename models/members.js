module.exports = function (sequelize, DataTypes) {
  return sequelize.define('member', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    last: DataTypes.STRING,
    first: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING
  });
};
