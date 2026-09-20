export type MockSessionKind = "guest" | "authenticated";

export type ThemePreference = "light" | "dark";

export type MockAccountView = Readonly<{
  id: string;
  kind: MockSessionKind;
  displayName: string;
  email?: string;
}>;

export type MockAlertView = Readonly<{
  id: string;
  scheduledAt: string;
  status: "scheduled" | "snoozed" | "completed";
}>;

export type TaskListItemView = Readonly<{
  id: string;
  kind: "task";
  title: string;
  status: "active" | "completed";
  dueAt?: string;
  explicitAlert?: MockAlertView;
}>;

export type ReminderCardView = Readonly<{
  id: string;
  kind: "reminder";
  title: string;
  status: "active" | "completed";
  nextOccurrenceAt: string;
  alert: MockAlertView;
}>;

export type MockOccurrenceView = Readonly<{
  id: string;
  reminderId: string;
  scheduledAt: string;
  effectiveAlertAt: string;
  status: "scheduled" | "snoozed" | "completed";
}>;

export type MockScenarioPhase =
  | "phase-1"
  | "phase-2"
  | "phase-3"
  | "phase-4"
  | "phase-5"
  | "phase-6"
  | "phase-7"
  | "phase-8"
  | "phase-9";

export type MockScenarioAvailability = "available" | "planned";

export type MockScenarioDefinition<Id extends string = string> = Readonly<{
  id: Id;
  title: string;
  description: string;
  phase: MockScenarioPhase;
  availability: MockScenarioAvailability;
  stitchId?: string;
}>;
