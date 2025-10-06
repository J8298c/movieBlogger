type RequiredEnvVariables = {
  ACCESS_TOKEN_SECRET: string;
  REFRESH_TOKEN_SECRET: string;
  MONGO_URI: string;
  PORT?: string;
};

export function getEnvVars(): RequiredEnvVariables {
  const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET, MONGO_URI } = process.env;

  if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET || !MONGO_URI) {
    throw new Error("Missing required environment variables");
  }

  return {
    ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN_SECRET,
    MONGO_URI,
  };
}
