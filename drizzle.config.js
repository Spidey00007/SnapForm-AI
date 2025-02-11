import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./configs/schema.js",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "",
  },
});
