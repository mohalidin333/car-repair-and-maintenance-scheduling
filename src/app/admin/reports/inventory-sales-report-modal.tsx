"use client";

import React, { useRef, useCallback } from "react";
import { InventorySalesData } from "./inventory-sales-data";
import { Button } from "@/components/ui/button";

interface InventorySalesReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InventorySalesReportModal({
  isOpen,
  onClose,
}: InventorySalesReportModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useCallback(() => {
    const win = window.open("", "_blank");
    if (!win) return;

    const totalItems = InventorySalesData.length;
    const totalQuantity = InventorySalesData.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const totalAmount = InventorySalesData.reduce(
      (sum, item) => sum + item.total_price,
      0
    );

    const categoryBreakdown = InventorySalesData.reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = { count: 0, quantity: 0, revenue: 0 };
      }
      acc[category].count += 1;
      acc[category].quantity += item.quantity;
      acc[category].revenue += item.total_price;
      return acc;
    }, {} as Record<string, { count: number; quantity: number; revenue: number }>);

    const averageOrderValue = totalAmount / totalItems;
    const averageQuantityPerOrder = totalQuantity / totalItems;

    const printStyles = `
      body { font-family: Arial, sans-serif; padding: 20px; margin: 0; color: #000; line-height: 1.4; }
      .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 15px; }
      .company-name { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
      .report-title { font-size: 20px; font-weight: bold; margin-bottom: 5px; }
      .report-date { font-size: 12px; color: #666; }
      .summary-section { margin-bottom: 25px; page-break-inside: avoid; }
      .summary-title { font-size: 16px; font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #000; padding-bottom: 5px; }
      .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 15px; }
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
      .total-row { font-weight: bold; background-color: #f0f0f0; }
      .total-row td { border-top: 2px solid #000; }
      .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #000; font-size: 10px; text-align: center; }
      @page { margin: 0.75in; }
      @media print { body { padding: 0; -webkit-print-color-adjust: exact; } .summary-section, .main-table, .total-row { page-break-inside: avoid; } }
    `;

    const tableRows = InventorySalesData.map((item, index) => {
      return `
        <tr>
          <td class="center-cell">${item.id}</td>
          <td class="center-cell">${new Date(
            item.created_at
          ).toLocaleDateString()}</td>
          <td class="center-cell">${item.category}</td>
          <td>${item.item_name}</td>
          <td class="center-cell">${item.quantity}</td>
          <td class="number-cell">₱${item.total_price.toFixed(2)}</td>
        </tr>
      `;
    }).join("");

    const categoryBreakdownRows = Object.entries(categoryBreakdown)
      .map(([category, data]) => {
        return `
        <div class="breakdown-row">
          <span>• ${category}:</span>
          <span>${data.count} items | ${
          data.quantity
        } qty | ₱${data.revenue.toFixed(2)} revenue</span>
        </div>
      `;
      })
      .join("");

    const printContent = `
      <div class="header">
        <div class="company-name">Your Company Name</div>
        <div class="report-title">INVENTORY SALES REPORT</div>
        <div class="report-date">Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</div>
      </div>
      <div class="summary-section">
        <div class="summary-title">EXECUTIVE SUMMARY</div>
        <div class="summary-grid">
          <div class="summary-item"><div class="summary-label">TOTAL ITEMS SOLD</div><div class="summary-value">${totalItems}</div></div>
          <div class="summary-item"><div class="summary-label">TOTAL QUANTITY</div><div class="summary-value">${totalQuantity}</div></div>
          <div class="summary-item"><div class="summary-label">TOTAL REVENUE</div><div class="summary-value">₱${totalAmount.toFixed(
            2
          )}</div></div>
          <div class="summary-item"><div class="summary-label">AVERAGE ORDER VALUE</div><div class="summary-value">₱${averageOrderValue.toFixed(
            2
          )}</div></div>
        </div>
        <div class="breakdown-section">
          <div class="summary-label">CATEGORY BREAKDOWN:</div>
          ${categoryBreakdownRows}
          <div class="breakdown-row" style="border-top: 1px solid #000; padding-top: 5px; margin-top: 10px; font-weight: bold;">
            <span>TOTAL:</span>
            <span>${totalItems} items | ${totalQuantity} qty | ₱${totalAmount.toFixed(
      2
    )} revenue</span>
          </div>
        </div>
      </div>
      <div class="summary-title">DETAILED SALES BREAKDOWN</div>
      <table class="main-table">
        <thead>
          <tr>
            <th>ID</th><th>Date</th><th>Category</th><th>Item Name</th><th>Quantity</th><th>Total Price</th>
          </tr>
        </thead>
        <tbody>${tableRows}</tbody>
        <tfoot>
          <tr class="total-row">
            <td class="center-cell" colspan="4">TOTAL REVENUE</td>
            <td class="center-cell">${totalQuantity}</td>
            <td class="number-cell">₱${totalAmount.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      <div class="footer">
        <div>Inventory Sales Report generated by Inventory Management System</div>
        <div>Page 1 of 1 | Confidential Business Information</div>
      </div>
    `;

    win.document.write(`
      <html>
        <head><title>Inventory Sales Report - ${new Date().toLocaleDateString()}</title><style>${printStyles}</style></head>
        <body>${printContent}</body>
      </html>
    `);

    win.document.close();
    win.focus();
    win.print();
    win.close();
  }, []);

  const totalQuantity = InventorySalesData.reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  const totalAmount = InventorySalesData.reduce(
    (sum, item) => sum + item.total_price,
    0
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] shadow-xl relative overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">
            Inventory Sales Report
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Generated on {new Date().toLocaleDateString()}
          </p>
        </div>
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div ref={printRef} className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Inventory Sales Report
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                      ID
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                      Category
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                      Item Name
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                      Quantity
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                      Total Price
                    </th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {InventorySalesData.map((item, index) => (
                    <tr
                      key={item.id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border border-gray-200 px-4 py-3">
                        {item.id}
                      </td>
                      <td className="border border-gray-200 px-4 py-3">
                        {item.category}
                      </td>
                      <td className="border border-gray-200 px-4 py-3">
                        {item.item_name}
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-center">
                        {item.quantity}
                      </td>
                      <td className="border border-gray-200 px-4 py-3 text-right font-medium">
                        ₱{item.total_price.toFixed(2)}
                      </td>
                      <td className="border border-gray-200 px-4 py-3">
                        {new Date(item.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 font-semibold">
                    <td
                      className="border border-gray-200 px-4 py-3"
                      colSpan={3}
                    >
                      Total
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-center">
                      {totalQuantity}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-right">
                      ₱{totalAmount.toFixed(2)}
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
            {InventorySalesData.length} items • Total: ₱{totalAmount.toFixed(2)}
          </div>
          <div className="flex gap-2">
            <Button
              onClick={handlePrint}
              className="bg-blue-600 text-white hover:bg-blue-700"
            >
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
