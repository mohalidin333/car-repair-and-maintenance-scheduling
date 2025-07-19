import { AppointmentTypeFields } from "../types/appointment-type";

export const appointmentFields: (AppointmentTypeFields | AppointmentTypeFields[])[] = [
  [
    {
      label: "Firstname",
      name: "firstname",
      type: "text",
    },
    {
      label: "Lastname",
      name: "lastname",
      type: "text",
    },
  ],
  {
    label: "Contact",
    name: "contact",
    type: "tel",
  },
  {
    label: "Address",
    name: "address",
    type: "text",
  },
  {
    label: "Car name",
    name: "car_name",
    type: "text",
  },
  {
    label: "Plate number",
    name: "plate_number",
    type: "text",
  },
  {
    label: "Issue Description",
    name: "issue_description",
    type: "textarea",
  },
];