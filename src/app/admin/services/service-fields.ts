import { ServiceFieldsType } from "./service-type";

export const ServiceFields: (ServiceFieldsType)[] = [
  {
    label: "Service Type",
    name: "service_type",
    type: "select",
    options: [
     "Repair",
     "Maintenance", 
    ]
  },
  {
    label: "Service Name",
    name: "service_name",
    type: "text",
  },
  {
    label: "Service Fee",
    name: "service_fee",
    type: "number",
  },
  {
    label: "Service Description",
    name: "description",
    type: "textarea",
  },
];