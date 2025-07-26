"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
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
  PhilippinePeso,
  Save,
  RotateCw,
  AlertTriangle,
} from "lucide-react";
import Invoice from "../invoice";
import { useParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { toast } from "sonner";
import { AppointmentType } from "@/app/customer/appointment-type";
import { currencyFormatter } from "@/app/utils/currency-formatter";
import { InventoryType } from "@/app/customer/inventory-type";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import axios from "axios";

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

export type Service = {
  service_type: string;
  service_name: string;
  service_fee: number;
};

const statusOptions = [
  "Pending",
  "Approved",
  "Disapproved",
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
  const [details, setDetails] = useState<AppointmentType>();
  const [smsMessage, setSmsMessage] = useState("");
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const param = useParams();
  const supabase = createClient();
  const [inventory, setInventory] = useState<InventoryType>([]);
  const [images, setImages] = useState<string[]>([]);
  const [sales, setSales] = useState<{
    service: number;
    inventory: number;
    total: number;
  }>({
    service: 0,
    inventory: 0,
    total: 0,
  });
  const [followUpNotes, setFollowUpNotes] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState("");
  const [reference, setReference] = useState("");
  const [smsCredit, setSMSCredits] = useState(0);

  // handle status
  const handleChangeStatus = async (e: ChangeEvent<HTMLSelectElement>) => {
    const status = e.target.value;

    try {
      // update status
      await supabase.from("appointments").update({ status }).eq("id", param.id);
      if (status === "Approved") {
        // update total sales
        await supabase.from("total_sales").insert({
          service: sales.service,
          inventory: sales.inventory,
          total: sales.total,
        });

        // update inventory
        inventory.map(async (item) => {
          const { data: stockItem } = await supabase
            .from("inventory")
            .select("*")
            .eq("category", item.category)
            .eq("item_name", item.item)
            .single();

          if (stockItem?.stock >= item.quantity) {
            const newStock = stockItem?.stock - item.quantity;
            await supabase
              .from("inventory")
              .update({ stock: newStock })
              .eq("category", item.category)
              .eq("item_name", item.item);
          } else {
            toast.error("Inventory is out of stock");
          }
        });
      }
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  // handle print
  const handlePrintInvoice = () => {
    setShowInvoice(true);
  };

  // handle send sms
  const handleSendSms = async () => {
    try {
      // Show loading toast
      const loadingToast = toast.loading("Sending SMS...");

      const contact = details?.contact?.replace(/^0/, "+63") || "";

      const response = await axios.post(
        "/api/sms/",
        {
          sms: smsMessage,
          contactNo: contact,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Success notification
      if ((response.data as { status: string }).status === "success") {
        // update sms credit
        await supabase
          .from("sms_credit")
          .update({ credit: smsCredit - 1 })
          .eq("id", 1);

        toast.success("SMS sent successfully!", {
          id: loadingToast,
        });
        setShowSmsModal(false);
      }

      console.log("SMS response:", response.data);
    } catch (error) {
      toast.error(
        (error as { response: { data: { error: string } } }).response.data.error
      );
    }
  };

  // format follow up date
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

  // handle follow up date
  const handleFollowUpDateChange = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const formattedDate = e.target.value;

      await supabase
        .from("appointments")
        .update({ follow_up_date: formattedDate })
        .eq("id", param.id);
      toast.success("Follow-up date updated successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  // handle save follow up notes
  const handleSaveFollowUpNotes = async () => {
    try {
      setIsSaving(true);
      await supabase
        .from("appointments")
        .update({ follow_up_for: followUpNotes })
        .eq("id", param.id);
      toast.success("Follow-up notes updated successfully");
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsSaving(false);
    }
  };

  // handle is paid
  const handleIsPaidChange = async (e: ChangeEvent<HTMLSelectElement>) => {
    try {
      const isPaid = e.target.value;
      await supabase
        .from("appointments")
        .update({ is_paid: isPaid })
        .eq("id", param.id);
      toast.success("Payment status updated successfully");
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  // get appointment
  useEffect(() => {
    const getAppointment = async () => {
      const { error, data: appointmentDetails } = await supabase
        .from("appointments")
        .select("*")
        .eq("id", param.id)
        .single();
      if (error) {
        toast.error(error.message);
      }
      setDetails(appointmentDetails);

      const parsedInventory = JSON.parse(
        appointmentDetails?.inventory || "[]"
      ) as InventoryType;
      const parsedImages = JSON.parse(appointmentDetails?.car_images || "[]");
      setInventory(parsedInventory);
      setImages(parsedImages);
      setSales({
        service:
          Number((appointmentDetails as AppointmentType).service_fee) || 0,
        inventory: parsedInventory.reduce(
          (sum, item) => sum + (item.total_price || 0),
          0
        ),
        total:
          Number((appointmentDetails as AppointmentType).service_fee) +
          parsedInventory.reduce(
            (sum, item) => sum + (item.total_price || 0),
            0
          ),
      });

      setFollowUpNotes(appointmentDetails?.follow_up_for || "");
      setStatus(appointmentDetails?.status || "");
    };
    getAppointment();
  }, [param.id]);

  // get payment
  useEffect(() => {
    const getPayment = async () => {
      const { error, data: paymentDetails } = await supabase
        .from("payments")
        .select("*")
        .eq("appointment_id", param.id)
        .single();
      if (error) {
        toast.error(error.message);
        return;
      }
      setReference(paymentDetails.reference);
    };
    getPayment();
  }, [param.id]);

  // get sms credit
  useEffect(() => {
    const getSMSCredit = async () => {
      const { error, data: smsCredit } = await supabase
        .from("sms_credit")
        .select("*")
        .single();
      if (error) {
        toast.error(error.message);
        return;
      }
      setSMSCredits(smsCredit?.credit);
    };
    getSMSCredit();
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Car className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Appointment #{details?.id}
                </h1>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <Calendar className="w-4 h-4" />
                  {details?.schedule}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div
                className={`px-3 py-1 rounded-full text-sm font-medium border ${
                  statusColors[details?.status as Status]
                }`}
              >
                {details?.status}
              </div>
              <button
                onClick={handlePrintInvoice}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                Print Invoice
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-4">
          {/* Customer Information Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
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
                  {details?.firstname} {details?.lastname}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600 font-medium">Contact:</span>
                <span className="text-gray-900">{details?.contact}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600 font-medium">Address:</span>
                <span className="text-gray-900">{details?.address}</span>
              </div>
            </div>
          </div>

          {/* Vehicle Information Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
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
                <span className="text-gray-900">{details?.car_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">Plate Number:</span>
                <span className="text-gray-900 bg-gray-100 px-2 py-1 rounded font-mono text-sm">
                  {details?.plate_number}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-gray-600 font-medium">Issue:</span>
                <span className="text-gray-900">
                  {details?.issue_description}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Car Images */}
        {images.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Car Images
            </h2>
            <div className="flex items-center gap-2">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <Image
                    width={200}
                    height={200}
                    src={img}
                    alt={`Car ${index + 1}`}
                    className="w-[200px] h-[200px] object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Service Details */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
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
              <span className="text-gray-900">{details?.service_type}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-gray-600 font-medium">Service Name:</span>
              <span className="text-gray-900">{details?.service_name}</span>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
              <span className="text-gray-600 font-medium">Fee:</span>
              <span className="text-xl font-bold text-green-600">
                {currencyFormatter(Number(details?.service_fee))}
              </span>
            </div>
          </div>
        </div>

        {/* Inventory Items */}
        {inventory.length > 0 && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
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
                  {inventory.map((item, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.category}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.item}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {currencyFormatter(item.total_price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Total and Actions */}
        <div className="bg-white rounded-xl  border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="text-2xl font-bold text-gray-900">
              Total:{" "}
              <span className="text-green-600">
                {currencyFormatter(Number(details?.total_fee))}
              </span>
            </div>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <select
                value={details?.status}
                onChange={handleChangeStatus}
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
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                Send SMS
              </button>
            </div>
          </div>
        </div>

        {status === "Completed" && (
          <>
            {/* payment */}
            {details?.is_paid === "Paid" && (
              <div className="flex flex-col items-start bg-white mt-4 rounded-xl  border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-green-100 p-2 rounded-lg flex items-center gap-3">
                    <PhilippinePeso className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    Payment
                  </h2>
                </div>

                <>
                  {" "}
                  {!reference ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-800">
                          Payment Confirmed
                        </span>
                      </div>
                      <div className="mt-2">
                        <span className="text-gray-600 text-sm">
                          GCash Reference:
                        </span>
                        <div className="font-mono text-lg font-semibold text-gray-900 bg-white px-3 py-2 rounded border mt-1">
                          {reference}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm font-medium text-yellow-800">
                          Payment Confirmation Required
                        </span>
                      </div>
                      <div className="space-y-2">
                        <select
                          value={details.is_paid}
                          onChange={handleIsPaidChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                          defaultValue=""
                        >
                          <option value="Unpaid">Unpaid</option>
                          <option value="Paid">Paid</option>
                        </select>
                      </div>
                    </div>
                  )}
                </>
              </div>
            )}
            {/* Follow-up Date Card */}
            <div className="bg-white rounded-xl  border border-gray-200 p-6 mt-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-rose-100 p-2 rounded-lg">
                  <CalendarDays className="w-5 h-5 text-rose-600" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Follow-up Schedule
                </h2>
              </div>

              {details?.follow_up_date && (
                <div className="mb-4 flex-1 bg-rose-50 p-3 rounded-lg border border-rose-200">
                  <p className="text-sm text-gray-600 mb-1">Scheduled for:</p>
                  <p className="text-rose-700 font-medium">
                    {formatFollowUpDate(details?.follow_up_date)}
                  </p>
                </div>
              )}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="flex-1 space-y-2">
                  <label
                    htmlFor="followUpDate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Select Follow-up Date
                  </label>
                  <Input
                    type="date"
                    id="followUpDate"
                    value={details?.follow_up_date || ""}
                    onChange={(e) => handleFollowUpDateChange(e)}
                    className="block"
                  />

                  <label
                    htmlFor="followUpDate"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Follow-up Notes
                  </label>
                  <Textarea
                    value={followUpNotes}
                    onChange={(e) => setFollowUpNotes(e.target.value)}
                    placeholder="Enter follow-up notes"
                  />

                  <div className="mt-4 flex justify-end w-full">
                    <button
                      onClick={handleSaveFollowUpNotes}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center gap-2 cursor-pointer"
                    >
                      {isSaving ? (
                        <RotateCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Save className="w-4 h-4" />
                      )}{" "}
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
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
                  Send SMS to {details?.contact}
                </h3>
              </div>

              {/* Show follow-up date in SMS modal if set */}
              {details?.follow_up_date && (
                <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-700">
                    <CalendarDays className="w-4 h-4 inline mr-1" />
                    Follow-up scheduled:{" "}
                    {formatFollowUpDate(details?.follow_up_date)}
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

              {/* sms credit */}
              <div>
                <div className="flex items-center gap-3 mt-4">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <AlertTriangle className="w-3 h-3 text-yellow-600" />
                  </div>
                  <p className="text-sm text-gray-600">
                    You have {smsCredit} SMS credits left
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {showInvoice && (
          <Invoice
            appointmentDetails={details as AppointmentType}
            onClose={() => setShowInvoice(false)}
          />
        )}
      </div>
    </div>
  );
}
