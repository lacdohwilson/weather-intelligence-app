import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '../../.env') });

const config = {
  /**
   * @breif The basic API environment, port and prefix configuration values
   */
  env: process.env.NODE_ENV,
  port: process.env.PORT || 9000,
  prefix: process.env.API_PREFIX || "/api/v1",

  /**
   * @breif Weather AI configuration values
   */
  weather: {
    base_url: process.env.WEATHER_BASE_URL,
    api_key: process.env.WEATHER_API_KEY,
  },
};

export default config;
