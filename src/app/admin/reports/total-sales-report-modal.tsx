"use client";

import React, { useRef, useCallback } from "react";
import { TotalSalesData } from "./total-sales-data";
import { Button } from "@/components/ui/button";

interface TotalSalesReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TotalSalesReportModal({ isOpen, onClose }: TotalSalesReportModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useCallback(() => {
    const win = window.open("", "_blank");
    if (!win) return;

    const totalService = TotalSalesData.reduce((sum, item) => sum + item.service, 0);
    const totalInventory = TotalSalesData.reduce((sum, item) => sum + item.inventory, 0);
    const totalRevenue = TotalSalesData.reduce((sum, item) => sum + item.total, 0);
    const totalEntries = TotalSalesData.length;
    const averageTransaction = totalRevenue / totalEntries;
    const servicePercentage = (totalService / totalRevenue) * 100;
    const inventoryPercentage = (totalInventory / totalRevenue) * 100;

    const printStyles = `
      body { font-family: Arial, sans-serif; padding: 20px; margin: 0; color: #000; line-height: 1.4; }
      .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #000; padding-bottom: 15px; }
      .company-name { font-size: 24px; font-weight: bold; margin-bottom: 5px; }
      .report-title { font-size: 20px; font-weight: bold; margin-bottom: 5px; }
      .report-date { font-size: 12px; color: #666; }
      .summary-section { margin-bottom: 25px; page-break-inside: avoid; }
      .summary-title { font-size: 16px; font-weight: bold; margin-bottom: 10px; border-bottom: 1px solid #000; padding-bottom: 5px; }
      .summary-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-bottom: 15px; }
      .summary-item { border: 1px solid #000; padding: 10px; }
      .summary-label { font-size: 12px; font-weight: bold; margin-bottom: 5px; }
      .summary-value { font-size: 16px; font-weight: bold; }
      .main-table { width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 11px; }
      .main-table th, .main-table td { border: 1px solid #000; padding: 8px 6px; text-align: left; }
      .main-table th { background-color: #f5f5f5; font-weight: bold; text-align: center; }
      .main-table .number-cell { text-align: right; }
      .main-table .center-cell { text-align: center; }
      .total-row { font-weight: bold; background-color: #f0f0f0; }
      .total-row td { border-top: 2px solid #000; }
      .footer { margin-top: 30px; padding-top: 15px; border-top: 1px solid #000; font-size: 10px; text-align: center; }
      @page { margin: 0.75in; }
      @media print {
        body { padding: 0; -webkit-print-color-adjust: exact; }
        .summary-section, .main-table, .total-row { page-break-inside: avoid; }
      }
    `;

    const tableRows = TotalSalesData.map((item, _) => {
      const servicePercent = (item.service / item.total) * 100;
      const inventoryPercent = (item.inventory / item.total) * 100;
      return `
        <tr>
          <td class="center-cell">${item.id}</td>
          <td class="center-cell">${new Date(item.created_at).toLocaleDateString()}</td>
          <td class="number-cell">₱${item.service.toFixed(2)}</td>
          <td class="number-cell">₱${item.inventory.toFixed(2)}</td>
          <td class="number-cell">₱${item.total.toFixed(2)}</td>
          <td class="center-cell">${servicePercent.toFixed(1)}%</td>
          <td class="center-cell">${inventoryPercent.toFixed(1)}%</td>
        </tr>
      `;
    }).join('');

    const printContent = `
      <div class="header">
        <div class="company-name">Your Company Name</div>
        <div class="report-title">TOTAL SALES REPORT</div>
        <div class="report-date">Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</div>
      </div>
      <div class="summary-section">
        <div class="summary-title">EXECUTIVE SUMMARY</div>
        <div class="summary-grid">
          <div class="summary-item"><div class="summary-label">TOTAL REVENUE</div><div class="summary-value">₱${totalRevenue.toFixed(2)}</div></div>
          <div class="summary-item"><div class="summary-label">TOTAL TRANSACTIONS</div><div class="summary-value">${totalEntries}</div></div>
          <div class="summary-item"><div class="summary-label">AVERAGE TRANSACTION</div><div class="summary-value">₱${averageTransaction.toFixed(2)}</div></div>
          <div class="summary-item"><div class="summary-label">REPORTING PERIOD</div><div class="summary-value">All Time</div></div>
        </div>
        <div style="margin-top: 15px;">
          <div class="summary-label">REVENUE BREAKDOWN:</div>
          <div style="margin-top: 5px;">• Service Sales: ₱${totalService.toFixed(2)} (${servicePercentage.toFixed(1)}%)</div>
          <div>• Inventory Sales: ₱${totalInventory.toFixed(2)} (${inventoryPercentage.toFixed(1)}%)</div>
        </div>
      </div>
      <div class="summary-title">DETAILED SALES BREAKDOWN</div>
      <table class="main-table">
        <thead>
          <tr><th>ID</th><th>Date</th><th>Service Sales</th><th>Inventory Sales</th><th>Total Sales</th><th>Service %</th><th>Inventory %</th></tr>
        </thead>
        <tbody>${tableRows}</tbody>
        <tfoot>
          <tr class="total-row">
            <td class="center-cell" colspan="2">TOTAL</td>
            <td class="number-cell">₱${totalService.toFixed(2)}</td>
            <td class="number-cell">₱${totalInventory.toFixed(2)}</td>
            <td class="number-cell">₱${totalRevenue.toFixed(2)}</td>
            <td class="center-cell">${servicePercentage.toFixed(1)}%</td>
            <td class="center-cell">${inventoryPercentage.toFixed(1)}%</td>
          </tr>
        </tfoot>
      </table>
      <div class="footer">
        <div>Report generated by Sales Management System</div>
        <div>Page 1 of 1 | Confidential Business Information</div>
      </div>
    `;

    win.document.write(`
      <html>
        <head>
          <title>Total Sales Report - ${new Date().toLocaleDateString()}</title>
          <style>${printStyles}</style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);

    win.document.close();
    win.focus();
    win.print();
    win.close();
  }, []);

  const totalService = TotalSalesData.reduce((sum, item) => sum + item.service, 0);
  const totalInventory = TotalSalesData.reduce((sum, item) => sum + item.inventory, 0);
  const totalRevenue = TotalSalesData.reduce((sum, item) => sum + item.total, 0);
  const totalEntries = TotalSalesData.length;
  const averageTransaction = totalRevenue / totalEntries;
  const servicePercentage = (totalService / totalRevenue) * 100;
  const inventoryPercentage = (totalInventory / totalRevenue) * 100;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-5xl max-h-[90vh] shadow-xl relative overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Total Sales Report</h2>
          <p className="text-sm text-gray-500 mt-1">
            Generated on {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          <div ref={printRef} className="p-6">
            <h2 className="text-2xl font-bold mb-4 text-violet-600">Total Sales Report</h2>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-violet-800">Total Revenue</h3>
                <p className="text-2xl font-bold text-violet-900">₱{totalRevenue.toFixed(2)}</p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-blue-800">Service Sales</h3>
                <p className="text-2xl font-bold text-blue-900">₱{totalService.toFixed(2)}</p>
                <p className="text-xs text-blue-700 mt-1">{servicePercentage.toFixed(1)}% of total</p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-orange-800">Inventory Sales</h3>
                <p className="text-2xl font-bold text-orange-900">₱{totalInventory.toFixed(2)}</p>
                <p className="text-xs text-orange-700 mt-1">{inventoryPercentage.toFixed(1)}% of total</p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h3 className="text-sm font-medium text-green-800">Avg Transaction</h3>
                <p className="text-2xl font-bold text-green-900">₱{averageTransaction.toFixed(2)}</p>
                <p className="text-xs text-green-700 mt-1">{totalEntries} transactions</p>
              </div>
            </div>

            <div className="mb-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">Revenue Distribution</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-700">Service: {servicePercentage.toFixed(1)}%</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-orange-500 rounded mr-2"></div>
                  <span className="text-sm text-gray-700">Inventory: {inventoryPercentage.toFixed(1)}%</span>
                </div>
              </div>
              <div className="mt-3 w-full bg-gray-200 rounded-full h-4">
                <div className="bg-blue-500 h-4 rounded-l-full" style={{ width: `${servicePercentage}%` }}></div>
                <div className="bg-orange-500 h-4 rounded-r-full -mt-4" style={{ width: `${inventoryPercentage}%`, marginLeft: `${servicePercentage}%` }}></div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 text-sm">
                <thead>
                  <tr className="bg-violet-50">
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">ID</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Service Sales</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Inventory Sales</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Total Sales</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Distribution</th>
                    <th className="border border-gray-200 px-4 py-3 text-left font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {TotalSalesData.map((item, index) => {
                    const servicePercent = (item.service / item.total) * 100;
                    const inventoryPercent = (item.inventory / item.total) * 100;

                    return (
                      <tr key={item.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="border border-gray-200 px-4 py-3">{item.id}</td>
                        <td className="border border-gray-200 px-4 py-3 text-right">
                          <span className="text-blue-700 font-medium">₱{item.service.toFixed(2)}</span>
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-right">
                          <span className="text-orange-700 font-medium">₱{item.inventory.toFixed(2)}</span>
                        </td>
                        <td className="border border-gray-200 px-4 py-3 text-right font-bold">
                          ₱{item.total.toFixed(2)}
                        </td>
                        <td className="border border-gray-200 px-4 py-3">
                          <div className="flex items-center text-xs">
                            <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                              <div className="bg-blue-500 h-2 rounded-l-full" style={{ width: `${servicePercent}%` }}></div>
                              <div className="bg-orange-500 h-2 rounded-r-full -mt-2" style={{ width: `${inventoryPercent}%`, marginLeft: `${servicePercent}%` }}></div>
                            </div>
                            <span className="text-gray-600">{servicePercent.toFixed(0)}%/{inventoryPercent.toFixed(0)}%</span>
                          </div>
                        </td>
                        <td className="border border-gray-200 px-4 py-3">{new Date(item.created_at).toLocaleDateString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-100 font-semibold">
                    <td className="border border-gray-200 px-4 py-3">Total</td>
                    <td className="border border-gray-200 px-4 py-3 text-right text-blue-700">
                      ₱{totalService.toFixed(2)}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-right text-orange-700">
                      ₱{totalInventory.toFixed(2)}
                    </td>
                    <td className="border border-gray-200 px-4 py-3 text-right text-lg">
                      ₱{totalRevenue.toFixed(2)}
                    </td>
                    <td className="border border-gray-200 px-4 py-3">
                      <span className="text-xs text-gray-600">{servicePercentage.toFixed(1)}%/{inventoryPercentage.toFixed(1)}%</span>
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
            {totalEntries} entries • Service: ₱{totalService.toFixed(2)} • Inventory: ₱{totalInventory.toFixed(2)} • Total: ₱{totalRevenue.toFixed(2)}
          </div>
          <div className="flex gap-2">
            <Button onClick={handlePrint} className="bg-violet-600 text-white hover:bg-violet-700">
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
