module.exports = {
  up: (queryInterface, DataTypes) => {
    queryInterface.createTable('Sessions', {
      sid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      expires: DataTypes.DATE,
      data: DataTypes.TEXT,
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
>>>>>>> docfy: persist sessions on database

  down: (queryInterface) => {
    queryInterface.dropTable('Sessions');
  },
};
