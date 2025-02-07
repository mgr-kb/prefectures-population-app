import { server } from "@/mocks/server";
import { fetchPrefectures } from "./prefectures";

describe("Prefectures API", () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  describe("fetchPrefectures", () => {
    test("取得成功", async () => {
      const data = await fetchPrefectures();

      expect(data).toHaveProperty("message");
      expect(data).toHaveProperty("result");
      expect(data.result.length).toBe(47);
    });
  });
});
