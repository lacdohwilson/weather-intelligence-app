import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const config = {
  /**
   * @breif The basic API environment, port and prefix configuration values
   */
  env: process.env.NODE_ENV,
  port: process.env.PORT || 9000,
  prefix: process.env.API_PREFIX || "/api",

  /**
   * @breif Weather AI configuration values
   */
  weatherAi: {
    base_url: process.env.WEATHER_AI_BASE_URL,
    api_key: process.env.WEATHER_API_KEY,
  },
};

export default config;
