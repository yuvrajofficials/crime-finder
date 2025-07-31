import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import crimeData from "../data/fake_people_data.json";
import slugify from "slugify";

const DetailsPage = () => {
  const location = useLocation();
  const { state, name } = useParams();

  // 1. Try getting item from location
  let { item } = location.state || {};

  // 2. If item not found, find it manually using slugified name
  if (!item) {
    item = crimeData.find(
      (person) =>
        slugify(person.full_name, { lower: true }) === name &&
        slugify(person.state, { lower: true }) === state
    );
  }

  if (!item) return <p className="p-6 text-red-600">No record found.</p>;

  const imageUrl = `https://randomuser.me/api/portraits/${
    item.gender === "Male" ? "men" : "women"
  }/${Math.floor(Math.random() * 90)}.jpg`;

  return (
    <div className="min-h-screen detailedContent bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={imageUrl}
            alt={item.full_name}
            className="w-40 h-40 rounded-lg object-cover border border-gray-300 dark:border-gray-600"
          />
          <div className="flex-1 space-y-2">
            <h1 className="text-2xl font-bold">{item.full_name}</h1>
            <p><strong>Gender:</strong> {item.gender}</p>
            <p><strong>DOB:</strong> {item.date_of_birth}</p>
            <p><strong>Father's Name:</strong> {item.father_name}</p>
            <p><strong>Address:</strong> {item.address}</p>
            <p><strong>District:</strong> {item.district}</p>
            <p><strong>State:</strong> {item.state}</p>
            <p><strong>Pincode:</strong> {item.pincode}</p>
            <p><strong>Aadhaar:</strong> {item.aadhaar_number}</p>
            <p><strong>Voter ID:</strong> {item.voter_id}</p>
            <p><strong>PAN:</strong> {item.pan_number}</p>
            <p><strong>Phone:</strong> {item.phone_number}</p>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Employment:</strong> {item.employment_status}</p>
            <p><strong>Occupation:</strong> {item.occupation}</p>
            <p><strong>Education:</strong> {item.education_level}</p>
            <p>
              <strong>Criminal Record:</strong>
              <span className={`ml-2 font-semibold ${item.criminal_record === "Yes" ? "text-red-500" : "text-green-500"}`}>
                {item.criminal_record}
              </span>
            </p>
          </div>
        </div>

        {item.criminal_record === "Yes" && item.crime_details && (
          <div className="mt-6 border-t border-gray-300 dark:border-gray-600 pt-4">
            <h2 className="text-xl font-semibold mb-2">Crime Details</h2>
            <p><strong>Type:</strong> {item.crime_details.crime_type}</p>
            <p><strong>FIR No:</strong> {item.crime_details.fir_number}</p>
            <p><strong>Police Station:</strong> {item.crime_details.police_station}</p>
            <p><strong>Case Status:</strong> {item.crime_details.case_status}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsPage;
