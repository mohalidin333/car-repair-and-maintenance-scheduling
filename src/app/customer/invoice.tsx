import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import {
  X,
  Printer,
  Car,
  User,
  Wrench,
  Package,
  Calendar,
  MapPin,
  Phone,
} from "lucide-react";
import { CustomerDetailsType } from "../admin/customers/page";


export type CustomerDetailsInventory = {
   category: string;
    item_name: string;
    quantity: number;
    total_price: number;
}

const Invoice = ({ customerDetails, onClose }: {customerDetails: CustomerDetailsType, onClose: () => void}) => {
  const invoiceRef = useRef(null);

  const handlePrint = useReactToPrint({
    documentTitle: "Title" as string,
    contentRef: invoiceRef,
  });

  const calculateSubtotal = () => {
    const serviceTotal = customerDetails.service.service_fee;
    const inventoryTotal = customerDetails.inventory.reduce(
      (sum: number, item: CustomerDetailsInventory) => sum + item.quantity * item.total_price,
      0
    );
    return serviceTotal + inventoryTotal;
  };

  const subtotal = calculateSubtotal();
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Action Buttons - Hidden when printing */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-end gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button
            onClick={onClose}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
            Close
          </button>
        </div>

        <div ref={invoiceRef} className="p-8 print:p-6">
          {/* Invoice Header */}
          <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-gray-200">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Car className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  AutoCare Pro
                </h1>
                <p className="text-gray-600 mt-1">
                  Professional Auto Repair Services
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    123 Service Road, Mechanic City
                  </div>
                  <div className="flex items-center gap-1">
                    <Phone className="w-4 h-4" />
                    (555) 123-4567
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  INVOICE
                </h2>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-600">
                    Invoice #:{" "}
                    <span className="font-semibold text-gray-900">
                      #{customerDetails.invoice_id}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Date:{" "}
                    <span className="font-semibold text-gray-900">
                      {new Date(
                        customerDetails.created_at
                      ).toLocaleDateString()}
                    </span>
                  </p>
                  <p className="text-gray-600">
                    Status:{" "}
                    <span
                      className={`font-semibold px-2 py-1 rounded-full text-xs ${
                        customerDetails.status === "Completed"
                          ? "bg-green-100 text-green-800"
                          : customerDetails.status === "In-Progress"
                          ? "bg-blue-100 text-blue-800"
                          : customerDetails.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {customerDetails.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer and Vehicle Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <User className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Customer Details
                </h3>
              </div>
              <div className="space-y-2">
                <p className="text-gray-900 font-medium">
                  {customerDetails.firstname} {customerDetails.lastname}
                </p>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4" />
                  {customerDetails.contact}
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  {customerDetails.address}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Car className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Vehicle Details
                </h3>
              </div>
              <div className="space-y-2">
                <p className="text-gray-900 font-medium">
                  {customerDetails.car_name}
                </p>
                <p className="text-gray-600">
                  Plate:{" "}
                  <span className="font-mono bg-gray-200 px-2 py-1 rounded text-sm">
                    {customerDetails.plate_number}
                  </span>
                </p>
                <p className="text-gray-600">
                  Issue:{" "}
                  <span className="text-gray-900">
                    {customerDetails.issue_description}
                  </span>
                </p>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  Scheduled: {customerDetails.schedule}
                </div>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-orange-100 p-2 rounded-lg">
                <Wrench className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                Service Performed
              </h3>
            </div>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="min-w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      Service Type
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                      Description
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-b border-gray-200">
                    <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                      {customerDetails.service.service_type}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-900">
                        {customerDetails.service.service_name}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {customerDetails.service.description}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                      ${customerDetails.service.service_fee.toFixed(2)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Inventory Items */}
          {customerDetails.inventory.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <Package className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Parts & Materials
                </h3>
              </div>
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">
                        Item
                      </th>
                      <th className="px-6 py-3 text-center text-sm font-medium text-gray-700">
                        Qty
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                        Unit Price
                      </th>
                      <th className="px-6 py-3 text-right text-sm font-medium text-gray-700">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {customerDetails.inventory.map(
                      (item: CustomerDetailsInventory, index: number) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-6 py-4 text-sm text-gray-900">
                            {item.item_name}
                          </td>
                          <td className="px-6 py-4 text-center text-sm text-gray-900">
                            {item.quantity}
                          </td>
                          <td className="px-6 py-4 text-right text-sm text-gray-900">
                            ${item.total_price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 text-right text-sm font-medium text-gray-900">
                            ${(item.quantity * item.total_price).toFixed(2)}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Total Section */}
          <div className="flex justify-end mb-8">
            <div className="w-full md:w-1/2 lg:w-1/3">
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="text-gray-900">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (8%):</span>
                    <span className="text-gray-900">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-300 pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-gray-900">Total:</span>
                      <span className="text-green-600">
                        ${total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Terms */}
          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h4 className="font-semibold text-gray-900 mb-2">
              Payment Terms & Conditions
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div>
                <p>• Payment is due within 30 days of invoice date</p>
                <p>• We accept cash, check, and major credit cards</p>
                <p>
                  • A 1.5% monthly service charge applies to overdue accounts
                </p>
              </div>
              <div>
                <p>• All parts come with a 90-day warranty</p>
                <p>• Labor is guaranteed for 30 days</p>
                <p>• Please bring this invoice when picking up your vehicle</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center border-t border-gray-200 pt-6">
            <p className="text-lg font-semibold text-gray-900 mb-2">
              Thank you for choosing AutoCare Pro!
            </p>
            <p className="text-sm text-gray-600">
              Your satisfaction is our priority. Please don&apos;t hesitate to
              contact us with any questions.
            </p>
            <div className="mt-4 text-xs text-gray-500">
              <p>
                This invoice was generated on {new Date().toLocaleDateString()}{" "}
                at {new Date().toLocaleTimeString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
