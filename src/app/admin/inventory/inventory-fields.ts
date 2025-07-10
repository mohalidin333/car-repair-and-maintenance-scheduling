import { InventoryFieldsType } from "./inventory-type";

export const InventoryFields: InventoryFieldsType[] = [
    {
        label: "Category",
        name: "category",
        type: "select",
        options: ["Product", "Part"]
    },
    {
        label: "Item Name",
        name: "item_name",
        type: "text",
    },
     {
        label: "Stock",
        name: "stock",
        type: "number",
    },
     {
        label: "Unit Price",
        name: "unit_price",
        type: "number",
    },
]