import React from "react";
import DashboardWrapper from "./DashboardWrapper";
import DataCollectionForm from "./DataCollectionForm";
import DataShowingTab from "./DataShowingTab";
import DataGraph from "./DataGraph";
import { useTheme } from "../../context/ThemeContext";

const Dashboard = () => {

  const {theme} = useTheme();

  const isTheme = theme === "light" ? "light" : "dark";



  return (
    <DashboardWrapper>
      <div className="min-h-screen p-0 md:p-6 max-w-full lg:max-w-7xl lg:mx-auto flex flex-col space-y-6">


        {/* Top Section: Form and Table */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Form */}
          <div className={`bg-white rounded-2xl lg:p-4 shadow-md border  ${ isTheme==="light" ? "bg-white border-gray-200" : "bg-zinc-900 border-zinc-800"}`}>
           <DataCollectionForm />
          </div>

          {/* Table */}
          <div className={` rounded-2xl lg:p-4 shadow-md border ${ isTheme==="light" ? "bg-white border-gray-200" : "bg-zinc-900 border-zinc-800"}`}>
            
            <DataGraph />
          </div>
        </div>

        {/* Bottom Section: Chart */}
        <div className={` rounded-2xl lg:p-6 shadow-md border   ${ isTheme==="light" ? "bg-white border-gray-200" : "bg-zinc-900 border-zinc-800"}`}>
         
          <DataShowingTab />
        </div>
      </div>
    </DashboardWrapper>
  );
};

export default Dashboard;
