import React from "react";
import CallToAction from "../components/CallToAction";

export default function University() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl mx-auto p-3 text-center">
        <h1 className="font-semibold mb-3">Texas Wesleyan University</h1>
        <p className="text-sm text-gray-500">
          Texas Wesleyan University, located in Fort Worth, is a vibrant and
          close-knit academic community. Known for its personalized approach to
          education, the university offers a dynamic learning environment with
          diverse programs and a strong commitment to student success.
        </p>
        <CallToAction />
      </div>
    </div>
  );
}
