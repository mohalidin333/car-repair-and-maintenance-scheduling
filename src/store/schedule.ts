import { Store } from "@tanstack/store";

export const scheduleStore = new Store<{
  schedule: string;
}>({
  schedule: "",
});
