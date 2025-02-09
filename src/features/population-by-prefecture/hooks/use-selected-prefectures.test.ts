import type { Prefecture } from "@/api/prefectures";
import { act, renderHook } from "@testing-library/react";
import { useSelectedPrefectures } from "./use-selected-prefectures";

describe("useSelectedPrefectures", () => {
  const mockPrefecture1: Prefecture = { prefCode: 1, prefName: "Hokkaido" };
  const mockPrefecture2: Prefecture = { prefCode: 2, prefName: "Aomori" };

  it("stateの初期状態は空", () => {
    const { result } = renderHook(() => useSelectedPrefectures());
    expect(result.current.selectedPrefectures).toEqual([]);
  });

  it("selectPrefecture によってアイテムが追加される", () => {
    const { result } = renderHook(() => useSelectedPrefectures());

    act(() => {
      result.current.selectPrefecture(mockPrefecture1);
    });

    expect(result.current.selectedPrefectures).toEqual([mockPrefecture1]);
  });

  it("同一アイテムを追加した場合、1つのアイテムのみ存在する", () => {
    const { result } = renderHook(() => useSelectedPrefectures());

    act(() => {
      result.current.selectPrefecture(mockPrefecture1);
      result.current.selectPrefecture(mockPrefecture1);
    });

    expect(result.current.selectedPrefectures).toEqual([mockPrefecture1]);
  });

  it("deselectPrefectures によってアイテムが削除される", () => {
    const { result } = renderHook(() => useSelectedPrefectures());

    act(() => {
      result.current.selectPrefecture(mockPrefecture1);
      result.current.selectPrefecture(mockPrefecture2);
      result.current.deselectPrefectures(mockPrefecture1);
    });

    expect(result.current.selectedPrefectures).toEqual([mockPrefecture2]);
  });

  it("複数アイテムが追加されていてもclearAllを実行すると空になる", () => {
    const { result } = renderHook(() => useSelectedPrefectures());

    act(() => {
      result.current.selectPrefecture(mockPrefecture1);
      result.current.selectPrefecture(mockPrefecture2);
      result.current.clearAll();
    });

    expect(result.current.selectedPrefectures).toEqual([]);
  });
});
