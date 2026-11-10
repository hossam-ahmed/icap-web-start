import Express, { json } from 'express';
import cors from 'cors';
import { API_METADATA, APIMetadata } from "../src/api/ApiMetadata";

const ORIGIN_PORT = 5173;
const MOCK_SERVER_PORT = 4009;

const app = Express();
const allowedOrigins = [`http://localhost:${ORIGIN_PORT}`];


const generateControllerRouter = (apiMetadata: APIMetadata, leadVersion: boolean = true) => {
  const ENV_API_BASE_URL= "api";
  const ENV_API_VERSION= "v1";
  const ENV_LEAD_VERSION = true;

  const apiLeadVersion = leadVersion ?? ENV_LEAD_VERSION;
  if (apiLeadVersion) {
    return `/${apiMetadata?.microserviceBaseurl}/${ENV_API_BASE_URL}/${ENV_API_VERSION}/${apiMetadata?.controller}`
  }

  return `/${apiMetadata?.microserviceBaseurl}/${ENV_API_BASE_URL}/${apiMetadata?.controller}/${ENV_API_VERSION}`
}

const corsOptions: cors.CorsOptions = {
  credentials: false,
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }
    callback(new Error(`Origin ${origin} is not allowed by CORS`));
  },
  allowedHeaders: ['Content-Type', 'Authorization', 'user_info'],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
};

app.use(json());
app.use(cors(corsOptions));
app.options('/*splat', cors(corsOptions));

// HOW TO REGISTER NEW MODULE
/*app.use(
  generateControllerRouter(API_METADATA.serviceA),
  moduleRouter,
);*/

// starting the server
app.listen(MOCK_SERVER_PORT);
console.log(`Starting mock server: ${MOCK_SERVER_PORT}...`);
