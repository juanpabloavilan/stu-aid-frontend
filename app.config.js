import * as dotenv from "dotenv";

dotenv.config();

export default {
  name: "stu-aid-frontend",
  extra: {
    env: process.env.ENV,
    apiURL: process.env.API_URL,
  },
};
