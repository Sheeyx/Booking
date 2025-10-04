import Errors, { HttpCode } from "../libs/Errors.js";
import EventService from "../model/eventService.js";

const eventController = {};
const eventService = new EventService();

// Create Event
eventController.createEvent = async (req, res) => {
  try {
    console.log("createEvent");
    const input = req.body; // { name, totalSeats }
    const result = await eventService.createEvent(input);
    res.status(HttpCode.CREATED).json(result);
  } catch (err) {
    console.log("Error, createEvent:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status((Errors.standard?.code) ?? 500).json(Errors.standard ?? { code: 500, message: "Server error" });
  }
};

// Get list of events
eventController.getEvents = async (_req, res) => {
  try {
    console.log("getEvents");
    const result = await eventService.getEvents();
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getEvents:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status((Errors.standard?.code) ?? 500).json(Errors.standard ?? { code: 500, message: "Server error" });
  }
};

// Get one of events
eventController.getEvent = async (req, res) => {
  try {
    console.log("getEvent");
    const { id } = req.params;
    const result = await eventService.getEvent(id);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, getEvent:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status((Errors.standard?.code) ?? 500).json(Errors.standard ?? { code: 500, message: "Server error" });
  }
};

// Update one of events
eventController.updateEvent = async (req, res) => {
  try {
    console.log("updateEvent",);
    const { id,  } = req.params;
    const input = req.body; // partial update
    console.log("updateEvent",input,id);

    const result = await eventService.updateEvent(id, input);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, updateEvent:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status((Errors.standard?.code) ?? 500).json(Errors.standard ?? { code: 500, message: "Server error" });
  }
};

// Remove one of events
eventController.removeEvent = async (req, res) => {
  try {
    console.log("removeEvent",req.params);
    const { id } = req.params;
    const result = await eventService.removeEvent(id);
    res.status(HttpCode.OK).json(result);
  } catch (err) {
    console.log("Error, removeEvent:", err);
    if (err instanceof Errors) res.status(err.code).json(err);
    else res.status((Errors.standard?.code) ?? 500).json(Errors.standard ?? { code: 500, message: "Server error" });
  }
};

export default eventController;
