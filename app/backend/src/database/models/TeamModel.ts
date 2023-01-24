import { Model, INTEGER, STRING } from 'sequelize';
import db from '.';

class Team extends Model {
  declare id: number;
  declare teamName: string;
}

Team.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  teamName: {
    type: STRING(30),
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Team',
  timestamps: false,
  tableName: 'teams',
});

export default Team;
