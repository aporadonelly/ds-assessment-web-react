import { renderHook, waitFor } from "@testing-library/react";

import { createQueryProviderWrapper } from "@/test-utils/create-query-provider-wrapper";
import { useNouns } from "@/queries";

describe("useNouns", () => {
  test("should fetch nouns", async () => {
    const { result } = renderHook(() => useNouns(), {
      wrapper: createQueryProviderWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toHaveLength(6);
  });
});
