import { useMutation } from "@tanstack/react-query";

import {
  ConferenceVerificationRequestBody,
  conferenceVerification,
} from "./services";

export function useConferenceVerification() {
  return useMutation(conferenceVerification);
}