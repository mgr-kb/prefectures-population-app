import { server } from "@/mocks/server";
import { fetchPopulationByPrefecture } from "./population";

describe("Population API", () => {
  beforeAll(() => {
    server.listen();
  });

  afterAll(() => {
    server.close();
  });

  describe("fetchPopulation", () => {
    test("取得成功", async () => {
      const data = await fetchPopulationByPrefecture("01");

      expect(data).toHaveProperty("message");
      expect(data).toHaveProperty("result");
      expect(data.result.boundaryYear).toBeGreaterThan(0);
      expect(data.result.data.length).toBeGreaterThan(0);
    });
  });
});
