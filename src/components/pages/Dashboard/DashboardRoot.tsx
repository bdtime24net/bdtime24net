import Dashboard from "@/components/molecules/v1/dashboard/Dashboard";
import { Button } from "antd";
import React from "react";

const DashboardRoot = () => {
  return (
    <div>
      <Dashboard />
      <Button type="primary">Primary Button</Button>
    </div>
  );
};

export default DashboardRoot;
