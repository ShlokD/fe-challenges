import type { EventType } from "./types";
export const transformEvents = (events: EventType[]) => {
  return events?.filter((ev) => ev?.markets?.length > 0);
};
