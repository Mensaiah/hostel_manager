module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    'Booking',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,

        primaryKey: true
      },
      roomId: {
        type: DataTypes.UUID,
        references: {
          model: 'Room',
          key: 'id'
        }
      },

      NumberOfGuests: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      checkIn: {
        type: DataTypes.DATE,
        allowNull: false
      },
      checkOut: {
        type: DataTypes.DATE,
        allowNull: false
      },
      dateBooked: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        allowNull: false
      },

      totalAmount: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {}
  );
  Booking.associate = function ({ Room }) {
    Booking.belongsTo(Room, {
      foreignKey: 'roomId',
      as: 'bookedRoom',
      onDelete: 'CASCADE'
    });
  };
  return Booking;
};
