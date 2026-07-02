import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDebounce } from "./useDebounce";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.runOnlyPendingTimers();
    vi.useRealTimers();
  });

  it("delays invoking the callback until the debounce period has elapsed", () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebounce());

    act(() => {
      result.current(callback, 300);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(299);
    });

    expect(callback).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1);
    });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("cancels the previous pending callback when a new debounce call is made", () => {
    const firstCallback = vi.fn();
    const secondCallback = vi.fn();
    const { result } = renderHook(() => useDebounce());

    act(() => {
      result.current(firstCallback, 300);
      result.current(secondCallback, 300);
    });

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(firstCallback).not.toHaveBeenCalled();
    expect(secondCallback).toHaveBeenCalledTimes(1);
  });

  it("does not invoke a pending callback after the hook unmounts", () => {
    const callback = vi.fn();
    const { result, unmount } = renderHook(() => useDebounce());

    act(() => {
      result.current(callback, 300);
    });

    unmount();

    act(() => {
      vi.advanceTimersByTime(300);
    });

    expect(callback).not.toHaveBeenCalled();
  });
});
