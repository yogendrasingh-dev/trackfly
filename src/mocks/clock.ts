export const MOCK_NOW_ISO = "2026-09-19T09:30:00+05:30";

export type MockClock = Readonly<{
  now: () => Date;
  nowIso: () => string;
}>;

export function createFixedMockClock(isoTimestamp = MOCK_NOW_ISO): MockClock {
  const fixedTimestamp = new Date(isoTimestamp).getTime();

  if (Number.isNaN(fixedTimestamp)) {
    throw new Error(`Invalid mock clock timestamp: ${isoTimestamp}`);
  }

  return Object.freeze({
    now: () => new Date(fixedTimestamp),
    nowIso: () => new Date(fixedTimestamp).toISOString(),
  });
}

export const mockClock = createFixedMockClock();
