import { conferenceHandler } from "./conference";
import { nounHandler } from "./noun";

export const handlers = [...conferenceHandler, ...nounHandler];