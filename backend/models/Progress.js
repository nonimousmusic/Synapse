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
    },
    technicalScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    communicationScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    problemSolvingScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    consistencyScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    retentionScore: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    history: {
      type: DataTypes.JSON,
      defaultValue: [],
    }
  });
};
