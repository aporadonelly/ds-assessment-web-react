import moment from "moment";

import { renderHook, act, waitFor } from "@/test-utils/testing-library-utils";
import { createQueryProviderWrapper } from "@/test-utils/create-query-provider-wrapper";
import { useConferenceVerification } from "@/mutations";

describe("useConferenceVerification", () => {
  it("should verify valid credentials ", async () => {
    const credentials = {
      homeRoomName: "ABCDE",
      studentNumber: "A001",
      nouns: ["Apple", "Orange"],
    };

    const { result } = renderHook(() => useConferenceVerification(), {
      wrapper: createQueryProviderWrapper(),
    });

    act(() => {
      result.current.mutate(credentials);
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toHaveProperty(
      "studentNumber",
      credentials.studentNumber
    );
  });

  it("should validate invalid home room name", async () => {
    const credentials = {
      homeRoomName: "INVALID",
      studentNumber: "A001",
      nouns: ["Apple", "Orange"],
    };

    const { result } = renderHook(() => useConferenceVerification(), {
      wrapper: createQueryProviderWrapper(),
    });

    act(() => {
      result.current.mutate(credentials);
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toHaveProperty(
      "response.data.message",
      "Incorrect Homeroom name"
    );
  });

  it("should validate invalid student number", async () => {
    const credentials = {
      homeRoomName: "ABCDE",
      studentNumber: "INVALID",
      nouns: ["Apple", "Orange"],
    };

    const { result } = renderHook(() => useConferenceVerification(), {
      wrapper: createQueryProviderWrapper(),
    });

    act(() => {
      result.current.mutate(credentials);
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toHaveProperty(
      "response.data.message",
      "Incorrect student number"
    );
  });

  it("should validate incorrect associated pictures", async () => {
    const credentials = {
      homeRoomName: "ABCDE",
      studentNumber: "A001",
      nouns: ["INVALID", "INVALID"],
    };

    const { result } = renderHook(() => useConferenceVerification(), {
      wrapper: createQueryProviderWrapper(),
    });

    act(() => {
      result.current.mutate(credentials);
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toHaveProperty(
      "response.data.message",
      "Incorrect associated pictures"
    );
  });

  it("should validate sign-in attempt 10 minutes before start time", async () => {
    process.env.TEST_CONFERENCE_START_DATE_TIME = moment(
      moment().subtract(10, "minutes")
    ).format("YYYY-MM-DD HH:mm:ss");

    const credentials = {
      homeRoomName: "ABCDE",
      studentNumber: "A001",
      nouns: ["Apple", "Orange"],
    };

    const { result } = renderHook(() => useConferenceVerification(), {
      wrapper: createQueryProviderWrapper(),
    });

    act(() => {
      result.current.mutate(credentials);
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toHaveProperty(
      "response.data.message",
      "Signing in too early. Try again 5 minutes before the conference start time."
    );
  });

  it("should validate sign-in attempt 5 minutes after the start time", async () => {
    process.env.TEST_CONFERENCE_START_DATE_TIME = moment(
      moment().add(5, "minutes")
    ).format("YYYY-MM-DD HH:mm:ss");

    const credentials = {
      homeRoomName: "ABCDE",
      studentNumber: "A001",
      nouns: ["Apple", "Orange"],
    };

    const { result } = renderHook(() => useConferenceVerification(), {
      wrapper: createQueryProviderWrapper(),
    });

    act(() => {
      result.current.mutate(credentials);
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toHaveProperty(
      "response.data.message",
      "Conference schedule has passed. Please contact your teacher."
    );
  });
});