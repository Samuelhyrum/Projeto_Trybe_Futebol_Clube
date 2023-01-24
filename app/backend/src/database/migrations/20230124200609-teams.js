module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('teams', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      teamMame: {
        type: Sequelize.STRING,
        allowNull: false,
        field: 'team_name',
      },
    });
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable('teams');
  },
};