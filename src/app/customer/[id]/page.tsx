"use client";

import React, { useState } from "react";
import {
  Printer,
  MessageCircle,
  Car,
  User,
  Wrench,
  Package,
  Calendar,
  MapPin,
  Phone,
  CalendarDays,
  FileText,
  Plus,
  Edit2,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import Invoice from "../invoice";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export type Status =
  | "Pending"
  | "Approved"
  | "Disapproved"
  | "Cancelled"
  | "Completed"
  | "In-Progress";

export type FollowUpNote = {
  id: string;
  date: string;
  note: string;
  createdAt: string;
};

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
  follow_up_notes: FollowUpNote[];
};

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
    "https://images.unsplash.com/photo-1494976688153-d4d29ba9a4b5?w=400&h=300&fit=crop",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
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
      item_name: "AC Compressor",
      quantity: 1,
      total_price: 129.99,
    },
  ],
  total: 3500.0,
  status: "Pending" as Status,
  follow_up_date: "",
  follow_up_notes: [
    {
      id: "1",
      date: "2024-05-10",
      note: "Customer called regarding AC still not working properly. Scheduled for re-inspection.",
      createdAt: "2024-05-10T14:30:00Z",
    },
  ],
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
  Pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  Approved: "bg-green-100 text-green-800 border-green-200",
  Disapproved: "bg-red-100 text-red-800 border-red-200",
  Cancelled: "bg-gray-100 text-gray-800 border-gray-200",
  "In-Progress": "bg-blue-100 text-blue-800 border-blue-200",
  Completed: "bg-emerald-100 text-emerald-800 border-emerald-200",
};

export default function WalkInPage() {
  const [details, setDetails] = useState<CustomerDetailsType>(customerDetails);
  const [smsMessage, setSmsMessage] = useState("");
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [newNoteDate, setNewNoteDate] = useState("");
  const [editingNote, setEditingNote] = useState<FollowUpNote | null>(null);
  const router = useRouter();

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

  const handleAddNote = () => {
    if (!newNote.trim() || !newNoteDate) return;

    const note: FollowUpNote = {
      id: Date.now().toString(),
      date: newNoteDate,
      note: newNote.trim(),
      createdAt: new Date().toISOString(),
    };

    setDetails({
      ...details,
      follow_up_notes: [...details.follow_up_notes, note],
    });

    setNewNote("");
    setNewNoteDate("");
    setShowAddNoteModal(false);
  };

  const handleEditNote = (note: FollowUpNote) => {
    setEditingNote(note);
    setNewNote(note.note);
    setNewNoteDate(note.date);
    setShowAddNoteModal(true);
  };

  const handleUpdateNote = () => {
    if (!editingNote || !newNote.trim() || !newNoteDate) return;

    const updatedNotes = details.follow_up_notes.map((note) =>
      note.id === editingNote.id
        ? { ...note, note: newNote.trim(), date: newNoteDate }
        : note
    );

    setDetails({
      ...details,
      follow_up_notes: updatedNotes,
    });

    setEditingNote(null);
    setNewNote("");
    setNewNoteDate("");
    setShowAddNoteModal(false);
  };

  const handleDeleteNote = (noteId: string) => {
    if (confirm("Are you sure you want to delete this note?")) {
      setDetails({
        ...details,
        follow_up_notes: details.follow_up_notes.filter(
          (note) => note.id !== noteId
        ),
      });
    }
  };

  const formatFollowUpDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto flex justify-end py-4">
        <Button onClick={() => router.push("/customer")} variant={"outline"}>
          <ArrowLeft size={15} />
          Dashboard
        </Button>
      </div>
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
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium border ${
                  statusColors[details.status]
                }`}
              >
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
              <h2 className="text-xl font-semibold text-gray-900">
                Customer Information
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">Name:</span>
                <span className="text-gray-900">
                  {details.firstname} {details.lastname}
                </span>
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
              <h2 className="text-xl font-semibold text-gray-900">
                Vehicle Information
              </h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">Car Model:</span>
                <span className="text-gray-900">{details.car_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">Plate Number:</span>
                <span className="text-gray-900 bg-gray-100 px-2 py-1 rounded font-mono text-sm">
                  {details.plate_number}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-600 font-medium">Issue:</span>
                <span className="text-gray-900">
                  {details.issue_description}
                </span>
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
            <h2 className="text-xl font-semibold text-gray-900">
              Follow-up Schedule
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="flex-1">
              <label
                htmlFor="followUpDate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
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
                <p className="text-rose-700 font-medium">
                  {formatFollowUpDate(details.follow_up_date)}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Follow-up Notes Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-100 p-2 rounded-lg">
                <FileText className="w-5 h-5 text-indigo-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Follow-up Notes
              </h2>
            </div>
            <button
              onClick={() => setShowAddNoteModal(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-md"
            >
              <Plus className="w-4 h-4" />
              Add Note
            </button>
          </div>

          {details.follow_up_notes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No follow-up notes yet</p>
              <p className="text-sm">
                Click "Add Note" to create your first follow-up note
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {details.follow_up_notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CalendarDays className="w-4 h-4 text-indigo-600" />
                        <span className="text-sm font-medium text-indigo-700">
                          Follow-up for: {formatFollowUpDate(note.date)}
                        </span>
                      </div>
                      <p className="text-gray-900 mb-2">{note.note}</p>
                      <p className="text-xs text-gray-500">
                        Added: {formatDateTime(note.createdAt)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEditNote(note)}
                        className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors duration-200"
                        title="Edit note"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        title="Delete note"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Car Images */}
        {details.car_images.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Car Images
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {details.car_images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
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
            <h2 className="text-xl font-semibold text-gray-900">
              Service Details
            </h2>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">Service Type:</span>
              <span className="text-gray-900">
                {details.service.service_type}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">Service Name:</span>
              <span className="text-gray-900">
                {details.service.service_name}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-gray-600 font-medium">Description:</span>
              <span className="text-gray-900">
                {details.service.description}
              </span>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
              <span className="text-gray-600 font-medium">Fee:</span>
              <span className="text-xl font-bold text-green-600">
                ${details.service.service_fee.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Inventory Items */}
        {details.inventory.length > 0 && (
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-teal-100 p-2 rounded-lg">
                <Package className="w-5 h-5 text-teal-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">
                Inventory Items
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 rounded-tl-lg">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Item Name
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                      Quantity
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 rounded-tr-lg">
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {details.inventory.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.category}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.item_name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        ${item.total_price.toFixed(2)}
                      </td>
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
              Total:{" "}
              <span className="text-green-600">
                ${details.total.toFixed(2)}
              </span>
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

        {/* Add/Edit Note Modal */}
        {showAddNoteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-indigo-100 p-2 rounded-lg">
                  <FileText className="w-5 h-5 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {editingNote ? "Edit Follow-up Note" : "Add Follow-up Note"}
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Follow-up Date
                  </label>
                  <input
                    type="date"
                    value={newNoteDate}
                    onChange={(e) => setNewNoteDate(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Note
                  </label>
                  <textarea
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 h-32 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                    placeholder="Enter your follow-up note here..."
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowAddNoteModal(false);
                    setEditingNote(null);
                    setNewNote("");
                    setNewNoteDate("");
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={editingNote ? handleUpdateNote : handleAddNote}
                  disabled={!newNote.trim() || !newNoteDate}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition-colors duration-200"
                >
                  {editingNote ? "Update Note" : "Add Note"}
                </button>
              </div>
            </div>
          </div>
        )}

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
                    Follow-up scheduled:{" "}
                    {formatFollowUpDate(details.follow_up_date)}
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

        {showInvoice && (
          <Invoice
            customerDetails={customerDetails}
            onClose={() => setShowInvoice(false)}
          />
        )}
      </div>
    </div>
  );
}
