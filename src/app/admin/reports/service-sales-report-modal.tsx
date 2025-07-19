"use client";

import React, { useRef, useCallback } from "react";
import { ServiceSalesData } from "./service-sales-data";
import { Button } from "@/components/ui/button";

interface ServiceSalesReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ServiceSalesReportModal({ isOpen, onClose }: ServiceSalesReportModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useCallback(() => {
    const win = window.open("", "_blank");
    if (!win) return;

    const totalServices = ServiceSalesData.length;
    const totalRevenue = ServiceSalesData.reduce((sum, service) => sum + service.service_fee, 0);
    const repairServices = ServiceSalesData.filter(service => service.service_type === "Repair");
    const maintenanceServices = ServiceSalesData.filter(service => service.service_type === "Maintenance");
    const repairCount = repairServices.length;
    const maintenanceCount = maintenanceServices.length;
    const repairRevenue = repairServices.reduce((sum, service) => sum + service.service_fee, 0);
    const maintenanceRevenue = maintenanceServices.reduce((sum, service) => sum + service.service_fee, 0);
    const averageServiceFee = totalRevenue / totalServices;

    const printStyles = `
      body { font-family: Arial, sans-serif; padding: 20px; margin: 0; color: #000; line-height: 1.4; }
      .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 15px; }
      .company-name { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
      .report-title { font-size: 20px; font-weight: bold; margin-bottom: 5px; }
      .report-date { font-size: 12px; color: #666; }
      .summary-section { margin-bottom: 25px; page-break-inside: avoid; }
      .summary-title { font-size: 16px; font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #000; padding-bottom: 5px; }
      .summary-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 15px; }
      .summary-item { border: 1px solid #000; padding: 10px; }
      .summary-label { font-size: 12px; font-weight: bold; margin-bottom: 5px; }
      .summary-value { font-size: 16px; font-weight: bold; }
      .breakdown-section { margin-top: 15px; border: 1px solid #000; padding: 10px; }
      .breakdown-row { display: flex; justify-content: space-between; margin-bottom: 5px; }
      .main-table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 11px; }
      .main-table th, .main-table td { border: 1px solid #000; padding: 8px 6px; text-align: left; }
      .main-table th { background-color: #f5f5f5; font-weight: bold; text-align: center; }
      .main-table .number-cell { text-align: right; }
      .main-table .center-cell { text-align: center; }
      .service-type-repair, .service-type-maintenance { font-weight: bold; }
      .total-row { font-weight: bold; background-color: #f0f0f0; }
      .total-row td { border-top: 2px solid #000; }
      .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #000; font-size: 10px; text-align: center; }
      @page { margin: 0.75in; }
      @media print {
        body { padding: 0; -webkit-print-color-adjust: exact; }
        .summary-section, .main-table, .total-row { page-break-inside: avoid; }
      }
    `;

    const tableRows = ServiceSalesData.map((service, index) => {
      return `
        <tr>
          <td class="center-cell">${service.id}</td>
          <td class="center-cell">${new Date(service.created_at).toLocaleDateString()}</td>
          <td class="center-cell service-type-${service.service_type.toLowerCase()}">${service.service_type}</td>
          <td>${service.service_name}</td>
          <td class="number-cell">₱${service.service_fee.toFixed(2)}</td>
        </tr>
      `;
    }).join('');

    const printContent = `
      <div class="header">
        <div class="company-name">Your Company Name</div>
        <div class="report-title">SERVICE SALES REPORT</div>
        <div class="report-date">Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</div>
      </div>

      <div class="summary-section">
        <div class="summary-title">EXECUTIVE SUMMARY</div>
        <div class="summary-grid">
          <div class="summary-item"><div class="summary-label">TOTAL SERVICES</div><div class="summary-value">${totalServices}</div></div>
          <div class="summary-item"><div class="summary-label">TOTAL REVENUE</div><div class="summary-value">₱${totalRevenue.toFixed(2)}</div></div>
          <div class="summary-item"><div class="summary-label">AVERAGE SERVICE FEE</div><div class="summary-value">₱${averageServiceFee.toFixed(2)}</div></div>
        </div>
        <div class="breakdown-section">
          <div class="summary-label">SERVICE TYPE BREAKDOWN:</div>
          <div class="breakdown-row"><span>• Repair Services:</span><span>${repairCount} services | ₱${repairRevenue.toFixed(2)} revenue</span></div>
          <div class="breakdown-row"><span>• Maintenance Services:</span><span>${maintenanceCount} services | ₱${maintenanceRevenue.toFixed(2)} revenue</span></div>
          <div class="breakdown-row" style="border-top: 1px solid #000; padding-top: 5px; margin-top: 10px; font-weight: bold;">
            <span>TOTAL:</span><span>${totalServices} services | ₱${totalRevenue.toFixed(2)} revenue</span>
          </div>
        </div>
      </div>

      <div class="summary-title">DETAILED SERVICE BREAKDOWN</div>
      <table class="main-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Service Type</th>
            <th>Service Name</th>
            <th>Service Fee</th>
          </tr>
        </thead>
        <tbody>${tableRows}</tbody>
        <tfoot>
          <tr class="total-row">
            <td class="center-cell" colspan="4">TOTAL REVENUE</td>
            <td class="number-cell">₱${totalRevenue.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <div class="footer">
        <div>Service Sales Report generated by Service Management System</div>
        <div>Page 1 of 1 | Confidential Business Information</div>
      </div>
    `;

    win.document.write(`
      <html>
        <head>
          <title>Service Sales Report - ${new Date().toLocaleDateString()}</title>
          <style>${printStyles}</style>
        </head>
        <body>${printContent}</body>
      </html>
    `);

    win.document.close();
    win.focus();
    win.print();
    win.close();
  }, []);

  const totalServices = ServiceSalesData.length;
  const totalRevenue = ServiceSalesData.reduce((sum, service) => sum + service.service_fee, 0);
  const repairServices = ServiceSalesData.filter(service => service.service_type === "Repair").length;
  const maintenanceServices = ServiceSalesData.filter(service => service.service_type === "Maintenance").length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] shadow-xl relative overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Service Sales Report</h2>
          <p className="text-sm text-gray-500 mt-1">Generated on {new Date().toLocaleDateString()}</p>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div ref={printRef} className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-emerald-600">Service Sales Report</h2>

            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-800">Total Services</h3>
                <p className="text-2xl font-bold text-blue-900">{totalServices}</p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-red-800">Repair Services</h3>
                <p className="text-2xl font-bold text-red-900">{repairServices}</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-green-800">Maintenance Services</h3>
                <p className="text-2xl font-bold text-green-900">{maintenanceServices}</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-emerald-50">
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">ID</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Service Type</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Service Name</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Service Fee</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {ServiceSalesData.map((service, index) => (
                    <tr key={service.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="border border-gray-200 px-4 py-3">{service.id}</td>
                      <td className="border border-gray-200 px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          service.service_type === "Repair"
                            ? "bg-red-100 text-red-700"
                            : "bg-green-100 text-green-700"
                        }`}>
                          {service.service_type}
                        </span>
                      </td>
                      <td className="border border-gray-200 px-4 py-3 font-medium">{service.service_name}</td>
                      <td className="border border-gray-200 px-4 py-3 text-right font-medium">
                        ₱{service.service_fee.toFixed(2)}
                      </td>
                      <td className="border border-gray-200 px-4 py-3">
                        {new Date(service.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 font-semibold">
                    <td className="border border-gray-200 px-4 py-3" colSpan={3}>Total Revenue</td>
                    <td className="border border-gray-200 px-4 py-3 text-right text-lg">
                      ₱{totalRevenue.toFixed(2)}
                    </td>
                    <td className="border border-gray-200 px-4 py-3"></td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            {totalServices} services • {repairServices} repairs • {maintenanceServices} maintenance • Total Revenue: ₱{totalRevenue.toFixed(2)}
          </div>
          <div className="flex gap-2">
            <Button onClick={handlePrint} className="bg-emerald-600 text-white hover:bg-emerald-700">
              Print Report
            </Button>
            <Button onClick={onClose} variant="outline">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
