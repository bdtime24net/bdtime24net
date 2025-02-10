"use client";
import { useRouter } from "next/navigation";
import { useDashboardUser } from "@/hooks/useDashboardUser";
import MainContent from "./MainContent";
import BlockCount from "./BlockCount";
import TagCount from "./TagCount";
import CategoryCount from './CategoryCount'
import ChartSection from "./ChartSection";
import SummaryCard from "./SummaryCard";

export default function Dashboard({
  
}) {
  const router = useRouter();
  const { user, loading } = useDashboardUser();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    router.push("/auth/signin");
    return null;
  }

  return (
    <div className="flex overflow-hidden bg-gray-100">
      <div className="flex flex-col flex-1 w-0">
        <MainContent>
          <div className="mt-32 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
           
            <BlockCount title="Total Articles Count" />
            <TagCount  />
            <CategoryCount />
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
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
