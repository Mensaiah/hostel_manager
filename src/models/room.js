module.exports = (sequelize, DataTypes) => {
  const Room = sequelize.define(
    'Room',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      room_number: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
      },
      typeId: {
        type: DataTypes.UUID,
        references: {
          model: 'RoomType',
          key: 'id'
        },
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {}
  );
  Room.associate = function ({ RoomType, Booking }) {
    Room.belongsTo(RoomType, {
      foreignKey: 'typeId',
      as: 'roomType',
      onDelete: 'CASCADE'
    });

    Room.hasMany(Booking, {
      foreignkey: 'roomId',
      as: 'bookedRoom'
    });
  };
  return Room;
};
