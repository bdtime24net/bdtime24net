"use client";
/* eslint-disable react/no-children-prop */
import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "./MainContent";
import { useState } from "react";
import BlockCount from "./BlockCount";
import ChartSection from "./ChartSection";
import SummaryCard from "./SummaryCard";

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex overflow-hidden bg-gray-100">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="flex flex-col flex-1 w-0">
        <Header setSidebarOpen={setSidebarOpen} />
        <MainContent>
          <div className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <BlockCount title="Total Users" count={150} />
            <BlockCount title="Active Sessions" count={42} />
            <BlockCount title="Revenue" count={12345} />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <ChartSection />
            <ChartSection />
            <ChartSection />
            <ChartSection />
            <ChartSection />
            <SummaryCard
              title="Recent Activity"
              value="5 New Messages"
              description="You have 5 new messages from your recent activities."
            />
          </div>
        </MainContent>
      </div>
    </div>
  );
}
