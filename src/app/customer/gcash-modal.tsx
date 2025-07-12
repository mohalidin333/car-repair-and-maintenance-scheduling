import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X, Copy, Check } from "lucide-react";

interface GCashPaymentProps {
  adminName: string;
  adminNumber: string;
  amountToPay: number;
  onSubmit: (amount: number, reference: string) => void;
  onClose: () => void;
}

export default function GCashPayment({ adminName, adminNumber, amountToPay, onSubmit, onClose }: GCashPaymentProps) {
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [errors, setErrors] = useState({ amount: "", reference: "" });
  const [copiedName, setCopiedName] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState(false);

  const copyToClipboard = (text: string, type: 'name' | 'number') => {
    navigator.clipboard.writeText(text);
    if (type === 'name') {
      setCopiedName(true);
      setTimeout(() => setCopiedName(false), 2000);
    } else {
      setCopiedNumber(true);
      setTimeout(() => setCopiedNumber(false), 2000);
    }
  };

  const validateForm = () => {
    const newErrors = { amount: "", reference: "" };
    
    if (!amount || Number(amount) <= 0) {
      newErrors.amount = "Please enter a valid amount";
    }
    
    if (!reference.trim()) {
      newErrors.reference = "Please enter the reference number";
    }
    
    setErrors(newErrors);
    return !newErrors.amount && !newErrors.reference;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(Number(amount), reference);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full mx-auto transform transition-all duration-300 scale-100" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <h2 className="text-xl font-bold text-gray-800">GCash Payment</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Instructions */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800 leading-relaxed">
              Transfer the amount to the GCash account below, then enter the payment details here to confirm your transaction.
            </p>
          </div>

          {/* Amount to Pay */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <Label className="text-sm font-medium text-green-700 mb-2 block">Amount to Pay</Label>
            <p className="text-3xl font-bold text-green-800">₱{amountToPay.toLocaleString('en-US', { minimumFractionDigits: 2 })}</p>
          </div>

          {/* Account Details */}
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <Label className="text-sm font-medium text-gray-600 mb-2 block">Account Name</Label>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-gray-800">{adminName}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(adminName, 'name')}
                  className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                >
                  {copiedName ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <Label className="text-sm font-medium text-gray-600 mb-2 block">GCash Number</Label>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-gray-800 tracking-wide">{adminNumber}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(adminNumber, 'number')}
                  className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700"
                >
                  {copiedNumber ? <Check className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="amount" className="text-sm font-medium text-gray-700 mb-2 block">
                Amount Paid (₱)
              </Label>
              <Input
                id="amount"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                className={`text-lg font-medium ${errors.amount ? 'border-red-500' : ''}`}
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                  if (errors.amount) setErrors(prev => ({ ...prev, amount: "" }));
                }}
              />
              {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
            </div>

            <div>
              <Label htmlFor="reference" className="text-sm font-medium text-gray-700 mb-2 block">
                Reference Number
              </Label>
              <Input
                id="reference"
                type="text"
                placeholder="Enter GCash reference number"
                className={`${errors.reference ? 'border-red-500' : ''}`}
                value={reference}
                onChange={(e) => {
                  setReference(e.target.value);
                  if (errors.reference) setErrors(prev => ({ ...prev, reference: "" }));
                }}
              />
              {errors.reference && <p className="text-red-500 text-sm mt-1">{errors.reference}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            onClick={handleSubmit} 
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 text-lg transition-colors duration-200"
          >
            Confirm Payment
          </Button>
        </div>
      </div>
    </div>
  );
}