'use client'
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Card } from "antd";
import { format } from "date-fns";
import { bn } from "date-fns/locale";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const prayerTimes = [
  { name: "ফজর", time: "৫:০০ AM" },
  { name: "যোহর", time: "১২:৩০ PM" },
  { name: "আসর", time: "৪:০০ PM" },
  { name: "মাগরিব", time: "৬:১৫ PM" },
  { name: "ঈশা", time: "৭:৩০ PM" },
];

function PrayerTimesComponent() {
  return (
    <div className="mt-6 p-4 bg-gray-200 rounded-lg shadow">
      <h3 className="text-lg font-semibold text-center mb-2">নামাজের সময়সূচি</h3>
      <ul className="text-center">
        {prayerTimes.map((prayer, index) => (
          <li key={index} className="py-1">
            {prayer.name}: {prayer.time}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function CalendarComponent() {
  const [value, setValue] = useState<Value>(new Date());

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-4 font-['Noto Sans Bengali', sans-serif]">
      <Card className="w-full max-w-md shadow-lg rounded-xl p-4 bg-white">
        <h2 className="text-xl font-semibold text-center mb-4">
          নির্বাচিত তারিখ: {value ? format(value as Date, "PPP", { locale: bn }) : "কোনো তারিখ নির্বাচিত হয়নি"}
        </h2>
        <div className="flex justify-center">
          <Calendar 
            onChange={setValue} 
            value={value} 
            className="rounded-lg shadow-sm border p-2"
            locale="bn-BD"
          />
        </div>
        <PrayerTimesComponent />
      </Card>
    </div>
  );
}
