import dotenv from "dotenv";
import app from "./app.js";
import sequelize from "./db/sequelize.js";

// import models so Sequelize knows about them
import "./schema/Event.model.js";

dotenv.config();

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connected to PostgreSQL with Sequelize");

    // Create table if it doesn’t exist
    await sequelize.sync(); 
    // or in dev mode to auto update columns: await sequelize.sync({ alter: true });

    console.log("✅ Tables synced");

    const PORT = process.env.PORT || 3003;
    app.listen(PORT, () => {
      console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("❌ DB error:", err);
    process.exit(1);
  }
})();
