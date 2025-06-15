
import React from "react";
import SidebarNav from "@/components/dashboard/SidebarNav";
import TopBar from "@/components/dashboard/TopBar";
import FileDropzone from "@/components/dashboard/FileDropzone";
import InfoPanel from "@/components/dashboard/InfoPanel";
import FilesList from "@/components/dashboard/FilesList";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-100 to-purple-100 dark:from-[#191930] dark:to-[#222244] w-full flex flex-col">
      <TopBar />
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <div className="w-64 hidden md:flex">
          <SidebarNav />
        </div>
        {/* Main Card */}
        <main className="flex-1 flex justify-center px-2 py-12">
          <div className="w-full max-w-5xl flex flex-col md:flex-row gap-10">
            <div className="flex-1 flex flex-col">
              <div className="rounded-2xl bg-white dark:bg-card border border-border shadow-lg p-8 flex flex-col gap-8">
                <FileDropzone />
                <FilesList />
              </div>
            </div>
            <div className="w-full md:w-auto">
              <InfoPanel />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
