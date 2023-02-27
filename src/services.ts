import { Noun, Conference } from "./models";
import request from "./utils";

export type GetAllNounResponse = Noun[];

export type ConferenceVerificationRequestBody = {
  homeRoomName: string;
  studentNumber: string;
  nouns: string[];
};

export type ConferenceVerificationResponse = Conference;

export async function getNouns() {
  const res = await request.get<GetAllNounResponse>(`/api/nouns`);
  return res.data;
}

export async function conferenceVerification(
  data: ConferenceVerificationRequestBody
) {
  const res = await request.post<ConferenceVerificationResponse>(
    `/api/conferences/verification`,
    data
  );
  return res.data;
}