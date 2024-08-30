import { ConfigProps } from "src/interfaces/config.interface";

export const config = ():ConfigProps => ({
    port: parseInt(process.env.PORT) || 3000,
    apiUrl: process.env.API_URL,
    connectionString: process.env.DB_URL
});