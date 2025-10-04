import { DataTypes } from "sequelize";
import sequelize from "../db/sequelize.js";
import Event from "./Event.model.js";

const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    // JS prop - DB column
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "event_id",
      references: { model: "events", key: "id" },
      onDelete: "CASCADE",
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "user_id",
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at",
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "updated_at",
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "bookings",
    timestamps: true,
    indexes: [
      // one user cannot book the same event twice
      { unique: true, fields: ["event_id", "user_id"] },
    ],
  }
);

// Associations
Booking.belongsTo(Event, { foreignKey: "eventId" });
Event.hasMany(Booking, { foreignKey: "eventId" });

export default Booking;
