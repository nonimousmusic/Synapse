module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Progress', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    currentDay: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    streak: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    growthScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    knowledgeScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    velocityScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    }
  });
};
