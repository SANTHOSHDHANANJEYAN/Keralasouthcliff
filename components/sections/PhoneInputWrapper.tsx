"use client";
import React from "react";
import PhoneInputLib from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function PhoneInputWrapper({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Phone
      </label>
      <PhoneInputLib
        country="us"
        value={value}
        onChange={(val) => onChange(val.startsWith("+") ? val : `+${val}`)}
        inputClass="!w-full !p-3 !pl-12 !text-base !border !border-gray-300 !rounded-md"
        buttonClass="!border-gray-300 !bg-white"
      />
    </div>
  );
}
