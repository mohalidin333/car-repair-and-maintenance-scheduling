import { Store } from "@tanstack/store";

export const scheduleStore = new Store<{
  firstname: string;
  lastname: string;
  contact: string;
  address: string;
  car_name: string;
  plate_number: string;
  issue_description: string;
  date: string;
}>({
  firstname: "",
  lastname: "",
  contact: "",
  address: "",
  car_name: "",
  plate_number: "",
  issue_description: "",
  date: "",
});
