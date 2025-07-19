export type AppointmentTypeFields = {
  label: string;
  name:
    | "firstname"
    | "lastname"
    | "contact"
    | "address"
    | "car_name"
    | "plate_number"
    | "issue_description";
  type: string;
};
