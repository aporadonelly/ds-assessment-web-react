import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

import {
  ConferenceVerificationRequestBody,
  ConferenceVerificationResponse,
  conferenceVerification,
} from "./services";

export function useConferenceVerification() {
  return useMutation<
    ConferenceVerificationResponse,
    AxiosError,
    ConferenceVerificationRequestBody
  >((data) => conferenceVerification(data));
}