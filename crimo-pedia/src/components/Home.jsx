import React from "react";
import data from "../data/fake_people_data.json"
import { NavLink } from "react-router-dom";
import slugify from "slugify";
const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-12">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          🕵️‍♂️ CRIMO PEDIA
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300">
          Criminal Records Open Source Directory
        </p>
        <p className="mt-4 text-md sm:text-lg text-gray-500 dark:text-gray-400">
          Access and verify synthetic criminal record data for testing and analysis.
        </p>
      </div>

      {/* Data Section Placeholder */}
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto p-6">
        <h2 className="text-2xl font-semibold mb-4">Records Directory</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          The table below shows a summary of background data. This is demo/sample content.
        </p>

        <table className="min-w-full text-left border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 border dark:border-gray-600">Name</th>
              <th className="px-4 py-2 border dark:border-gray-600">State</th>
              <th className="px-4 py-2 border dark:border-gray-600">Adhar</th>
              <th className="px-4 py-2 border dark:border-gray-600">Phone</th>
              <th className="px-4 py-2 border dark:border-gray-600">Email</th>
              <th className="px-4 py-2 border dark:border-gray-600">Criminal</th>
              <th className="px-4 py-2 border dark:border-gray-600">View Details</th>
            </tr>
          </thead>
          <tbody>

      {data?.map((item,index)=>(
         <tr className="hover:bg-gray-50 dark:hover:bg-gray-700" key={index}>
              <td className="px-4 py-2 border dark:border-gray-600">{item.full_name}</td>
              <td className="px-4 py-2 border dark:border-gray-600">{item.state}</td>
              <td className="px-4 py-2 border dark:border-gray-600">{item.aadhaar_number}</td>
              <td className="px-4 py-2 border dark:border-gray-600">{item.phone_number}</td>
              <td className="px-4 py-2 border dark:border-gray-600">{item.email}</td>
              <td className="px-4 py-2 border dark:border-gray-600">{item.criminal_record}</td>
              <td className="px-4 py-2 border dark:border-gray-600">

              <NavLink   state={{ item }}
 to={`/details/${slugify(item.state).toLowerCase()}/${slugify(item.full_name).toLowerCase()}`}  className='text-blue-600 underline'>view</NavLink>
              </td>

            </tr>
    ))}
           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
