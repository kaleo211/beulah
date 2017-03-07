module.exports = function (sequelize, DataTypes) {
  return sequelize.define('transaction', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    from: DataTypes.STRING,
    to: DataTypes.STRING,
    total: DataTypes.FLOAT,
    date: DataTypes.DATE,
    type: DataTypes.STRING,
    category: DataTypes.STRING,
    memo: DataTypes.STRING
  });
};
