import Errors, { HttpCode, Message } from "../libs/Errors.js";
import EventModel from "../schema/Event.model.js";

class EventService {
  constructor(model = EventModel) {
    this.eventModel = model; // Sequelize model
  }

  // Create
  async createEvent(input) {
    try {
      const { name, totalSeats } = input ?? {};
      if (typeof name !== "string" || name.trim() === "" || typeof totalSeats !== "number") {
        throw new Errors(HttpCode.BAD_REQUEST, Message.INVALID_INPUT || "Invalid input");
      }
      const payload = { name: name.trim(), totalSeats };
      const created = await this.eventModel.create(payload);
      return created;
    } catch (err) {
      if (err instanceof Errors) throw err;
      console.error("Error, model: createEvent:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.CREATE_FAILED);
    }
  }

  // Read all
  async getEvents() {
    const rows = await this.eventModel.findAll({ order: [["id", "ASC"]] });
    if (!rows || rows.length === 0) {
      throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    }
    return rows;
  }

  // Read one
  async getEvent(id) {
    const eventId = Number(id);
    if (!Number.isInteger(eventId)) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.INVALID_INPUT || "Invalid id");
    }
    const row = await this.eventModel.findByPk(eventId);
    if (!row) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);
    return row;
  }

  // Update (partial)
async updateEvent(id, input) {
  console.log("input", input);

  const eventId = Number(id);
  if (!Number.isInteger(eventId)) {
    throw new Errors(HttpCode.BAD_REQUEST, Message.INVALID_INPUT || "Invalid id");
  }

  const event = await this.eventModel.findByPk(eventId);
  if (!event) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

  try {
    const next = {
      name: input?.name?.trim() || event.name,
      totalSeats: input?.totalSeats
        ? Number(input.totalSeats) // convert string → number
        : event.totalSeats,
    };

    // validation
    if (!next.name || isNaN(next.totalSeats)) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.INVALID_INPUT || "Invalid input");
    }

    console.log("seat", next.totalSeats);
    console.log("event before", event.totalSeats);

    event.name = next.name;
    event.totalSeats = next.totalSeats;
    await event.save();

    console.log("event after", event.totalSeats);
    return event;
  } catch (err) {
    console.error("Error, model: updateEvent:", err);
    throw new Errors(HttpCode.BAD_REQUEST, Message.UPDATE_FAILED);
  }
}



  // Delete
  async removeEvent(id) {
    const eventId = Number(id);
    if (!Number.isInteger(eventId)) {
      throw new Errors(HttpCode.BAD_REQUEST, Message.INVALID_INPUT || "Invalid id");
    }

    const event = await this.eventModel.findByPk(eventId);
    if (!event) throw new Errors(HttpCode.NOT_FOUND, Message.NO_DATA_FOUND);

    try {
      await event.destroy();
      return event; // return deleted record (useful for clients)
    } catch (err) {
      console.error("Error, model: removeEvent:", err);
      throw new Errors(HttpCode.BAD_REQUEST, Message.REMOVE_FAILED);
    }
  }
}

export default EventService;
