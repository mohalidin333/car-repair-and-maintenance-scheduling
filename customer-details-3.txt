"use client";

import React, { useState } from "react";
import { Printer, MessageCircle, Car, User, Wrench, Package, Calendar, MapPin, Phone, CalendarDays } from "lucide-react";
import Invoice from "../invoice";
import Image from "next/image";

export type Status = "Pending" | "Approved" | "Disapproved" | "Cancelled" | "Completed" | "In-Progress"

export type CustomerDetailsType = {
  invoice_id: string;
  firstname: string;
  lastname: string;
  contact: string;
  address: string;
  car_name: string;
  plate_number: string;
  issue_description: string;
  car_images: string[];
  schedule: string;
  service: {
    service_type: string;
    service_name: string;
    service_fee: number;
    description: string;
  };
  inventory: {
    category: string;
    item_name: string;
    quantity: number;
    total_price: number;
  }[];
  total: number;
  status: Status;
  follow_up_date?: string;
}

const customerDetails = {
  invoice_id: "1234",
  firstname: "John",
  lastname: "Doe",
  contact: "1234567890",
  address: "123 Main St",
  car_name: "Honda Civic",
  plate_number: "ABC123",
  issue_description: "Engine problem",
  car_images: [
    "https://example.com/image1.jpg",
    "https://example.com/image2.jpg",
  ],
  schedule: "Tuesday May 7, 10:00 AM",
  service: {
    service_type: "Repair",
    service_name: "Air Conditioning Repair",
    service_fee: 3500.0,
    description:
      "Diagnose and repair issues with the vehicle's air conditioning system.",
  },
  inventory: [
    {
      category: "Product",
      item_name: "Premium Office Chair",
      quantity: 1,
      total_price: 129.99,
    },
  ],
  total: 3500.0,
  status: "Pending" as Status,
  follow_up_date: "",
  created_at: "2023-05-07T10:00:00Z",
};

const statusOptions = [
  "Pending",
  "Approved",
  "Disapproved",
  "Cancelled",
  "In-Progress",
  "Completed",
];

const statusColors = {
  "Pending": "bg-yellow-100 text-yellow-800 border-yellow-200",
  "Approved": "bg-green-100 text-green-800 border-green-200",
  "Disapproved": "bg-red-100 text-red-800 border-red-200",
  "Cancelled": "bg-gray-100 text-gray-800 border-gray-200",
  "In-Progress": "bg-blue-100 text-blue-800 border-blue-200",
  "Completed": "bg-emerald-100 text-emerald-800 border-emerald-200",
};

export default function WalkInPage() {
  const [details, setDetails] = useState<CustomerDetailsType>(customerDetails);
  const [smsMessage, setSmsMessage] = useState("");
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);

  const handlePrintInvoice = () => {
    setShowInvoice(true);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as Status;
    setDetails({ ...details, status: newStatus });
  };

  const handleFollowUpDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDetails({ ...details, follow_up_date: e.target.value });
  };

  const handleSendSms = () => {
    alert(`SMS sent to ${details.contact}:\n\n${smsMessage}`);
    setShowSmsModal(false);
    setSmsMessage("");
  };

  const formatFollowUpDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Car className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Appointment #{details.invoice_id}
                </h1>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <Calendar className="w-4 h-4" />
                  {details.schedule}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className={`px-3 py-1 rounded-full text-sm font-medium border ${statusColors[details.status]}`}>
                {details.status}
              </div>
              <button
                onClick={handlePrintInvoice}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-md"
              >
                <Printer className="w-4 h-4" />
                Print Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Customer Information Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-2 rounded-lg">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Customer Information</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">Name:</span>
                <span className="text-gray-900">{details.firstname} {details.lastname}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600 font-medium">Contact:</span>
                <span className="text-gray-900">{details.contact}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600 font-medium">Address:</span>
                <span className="text-gray-900">{details.address}</span>
              </div>
            </div>
          </div>

          {/* Vehicle Information Card */}
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Car className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Vehicle Information</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">Car Model:</span>
                <span className="text-gray-900">{details.car_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">Plate Number:</span>
                <span className="text-gray-900 bg-gray-100 px-2 py-1 rounded font-mono text-sm">{details.plate_number}</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-600 font-medium">Issue:</span>
                <span className="text-gray-900">{details.issue_description}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Follow-up Date Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-rose-100 p-2 rounded-lg">
              <CalendarDays className="w-5 h-5 text-rose-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Follow-up Schedule</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1">
              <label htmlFor="followUpDate" className="block text-sm font-medium text-gray-700 mb-2">
                Select Follow-up Date
              </label>
              <input
                type="date"
                id="followUpDate"
                value={details.follow_up_date || ""}
                onChange={handleFollowUpDateChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-colors duration-200"
              />
            </div>
            {details.follow_up_date && (
              <div className="flex-1 bg-rose-50 p-3 rounded-lg border border-rose-200">
                <p className="text-sm text-gray-600 mb-1">Scheduled for:</p>
                <p className="text-rose-700 font-medium">{formatFollowUpDate(details.follow_up_date)}</p>
              </div>
            )}
          </div>
        </div>

        {/* Car Images */}
        {details.car_images.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Car Images</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {details.car_images.map((img, index) => (
                <div key={index} className="relative group">
                  <Image
                    width={100}
                    height={100}
                    src={img}
                    alt={`Car ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg border border-gray-200 group-hover:shadow-lg transition-shadow duration-200"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-200 rounded-lg"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Service Details */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Wrench className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Service Details</h2>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">Service Type:</span>
              <span className="text-gray-900">{details.service.service_type}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">Service Name:</span>
              <span className="text-gray-900">{details.service.service_name}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-600 font-medium">Description:</span>
              <span className="text-gray-900">{details.service.description}</span>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
              <span className="text-gray-600 font-medium">Fee:</span>
              <span className="text-xl font-bold text-green-600">${details.service.service_fee.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Inventory Items */}
        {details.inventory.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <Package className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Inventory Items</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 rounded-tl-lg">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Item Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">Quantity</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 rounded-tr-lg">Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {details.inventory.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-4 py-3 text-sm text-gray-900">{item.category}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.item_name}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">${item.total_price.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Total and Actions */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-2xl font-bold text-gray-900">
              Total: <span className="text-green-600">${details.total.toFixed(2)}</span>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <select
                value={details.status}
                onChange={handleStatusChange}
                className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              >
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setShowSmsModal(true)}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                Send SMS
              </button>
            </div>
          </div>
        </div>

        {/* SMS Modal */}
        {showSmsModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-green-100 p-2 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Send SMS to {details.contact}
                </h3>
              </div>
              
              {/* Show follow-up date in SMS modal if set */}
              {details.follow_up_date && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700">
                    <CalendarDays className="w-4 h-4 inline mr-1" />
                    Follow-up scheduled: {formatFollowUpDate(details.follow_up_date)}
                  </p>
                </div>
              )}
              
              <textarea
                value={smsMessage}
                onChange={(e) => setSmsMessage(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 mb-4 h-32 focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors duration-200"
                placeholder="Type your message here..."
              />
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowSmsModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendSms}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Invoice */}
        {showInvoice && (
         <Invoice customerDetails={customerDetails} onClose={() => setShowInvoice(false)}  />
        )}
      </div>
    </div>
  );
}