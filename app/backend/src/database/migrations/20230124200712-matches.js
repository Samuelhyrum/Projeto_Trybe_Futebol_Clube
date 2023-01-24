module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      homeTeamId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'home_team_id',
        references: {
          model: 'teams',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      homeTeamGoals: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'home_team_goals'
      },
      away_team_id: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      awayTeamId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'away_team_id',
        references: {
          model: 'teams',
          key: 'id',
        },
      },
      awayTeamGoals: {
          allowNull: false,
          type: Sequelize.INTEGER,
          field: 'away_team_goals'
        },
        inProgress: {
          allowNull: false,
          type: Sequelize.BOOLEAN,
          field: 'in_progress'
        }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('matches');
  },
};