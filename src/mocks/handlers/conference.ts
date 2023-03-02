import { rest } from "msw";
import { pick } from "lodash";
import moment from "moment";

import { ConferenceVerificationRequestBody } from "@/services";

export const conferenceHandler = [
  rest.post("**/api/conferences/verification", async (req, res, ctx) => {
    const now = moment().format("YYYY-MM-DD HH:mm:ss");

    const conference = {
      homeRoomName: "ABCDE",
      studentNumber: "A001",
      nouns: "Apple, Orange",
      startDateTime: process.env.TEST_CONFERENCE_START_DATE_TIME,
    };

    const { homeRoomName, studentNumber, nouns } =
      await req.json<ConferenceVerificationRequestBody>();

    if (homeRoomName !== conference.homeRoomName) {
      return res(
        ctx.status(400),
        ctx.json({ message: "Incorrect Homeroom name" })
      );
    } else if (studentNumber !== conference.studentNumber) {
      return res(
        ctx.status(400),
        ctx.json({ message: "Incorrect student number" })
      );
    } else if (
      nouns.sort().join("") !== conference.nouns.split(", ").sort().join("")
    ) {
      return res(
        ctx.status(400),
        ctx.json({ message: "Incorrect associated pictures" })
      );
    } else if (moment(now).diff(conference.startDateTime, "minutes") >= 10) {
      return res(
        ctx.status(400),
        ctx.json({ message: "Signing in too early. Try again 5 minutes before the conference start time." })
      );
    } else if (moment(conference.startDateTime).diff(now, "minutes") >= 5) {
      return res(
        ctx.status(400),
        ctx.json({ message: "Conference schedule has passed. Please contact your teacher." })
      );
    } else {
      return res(ctx.status(200), ctx.json(pick(conference, "studentNumber")));
    }
  }),
];