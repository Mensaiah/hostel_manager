module.exports = (sequelize, DataTypes) => {
  const RoomType = sequelize.define(
    'RoomType',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
      },
      number_of_beds: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {}
  );
  RoomType.associate = function ({ Room }) {
    // associations can be defined here
    RoomType.hasMany(Room, {
      foreignKey: 'typeId',
      as: 'roomType'
    });
  };
  return RoomType;
};
