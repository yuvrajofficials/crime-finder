const { faker } = require('@faker-js/faker');
const fs = require('fs');

const stateAbbrMap = {
  "Andhra Pradesh": "AP", "Arunachal Pradesh": "AR", "Assam": "AS", "Bihar": "BR", "Chhattisgarh": "CG",
  "Goa": "GA", "Gujarat": "GJ", "Haryana": "HR", "Himachal Pradesh": "HP", "Jharkhand": "JH",
  "Karnataka": "KA", "Kerala": "KL", "Madhya Pradesh": "MP", "Maharashtra": "MH", "Manipur": "MN",
  "Meghalaya": "ML", "Mizoram": "MZ", "Nagaland": "NL", "Odisha": "OR", "Punjab": "PB",
  "Rajasthan": "RJ", "Sikkim": "SK", "Tamil Nadu": "TN", "Telangana": "TS", "Tripura": "TR",
  "Uttar Pradesh": "UP", "Uttarakhand": "UK", "West Bengal": "WB", "Delhi": "DL", "Jammu and Kashmir": "JK"
};

function generatePerson() {
  const state = faker.location.state();
  const stateAbbr = stateAbbrMap[state] || 'XX';
  const isCriminal = faker.helpers.arrayElement([true, false, false]);

  return {
    full_name: faker.person.fullName(),
    gender: faker.helpers.arrayElement(["Male", "Female"]),
    date_of_birth: faker.date.birthdate({ min: 18, max: 70, mode: 'age' }).toISOString().split('T')[0],
    father_name: faker.person.fullName({ sex: 'male' }),
    address: faker.location.streetAddress(),
    district: faker.location.city(),
    state: state,
    pincode: faker.location.zipCode("######"),
    aadhaar_number: `${faker.number.int({ min: 1000, max: 9999 })}-${faker.number.int({ min: 1000, max: 9999 })}-${faker.number.int({ min: 1000, max: 9999 })}`,
    voter_id: `${stateAbbr}/${faker.number.int({ min: 100, max: 999 })}/${faker.number.int({ min: 100000, max: 999999 })}`,
    pan_number: `${faker.string.alpha({ length: 5, casing: 'upper' })}${faker.number.int({ min: 1000, max: 9999 })}${faker.string.alpha({ length: 1, casing: 'upper' })}`,
    phone_number: faker.phone.number("9#########"),
    email: faker.internet.email(),
    employment_status: faker.helpers.arrayElement(["Employed", "Self-employed", "Unemployed", "Student"]),
    occupation: faker.person.jobTitle(),
    education_level: faker.helpers.arrayElement(["10th Pass", "12th Pass", "Graduate", "Postgraduate"]),
    criminal_record: isCriminal ? "Yes" : "No",
    crime_details: isCriminal ? {
      crime_type: faker.helpers.arrayElement(["Theft", "Assault", "Cyber Crime", "Fraud"]),
      fir_number: `FIR/${faker.number.int({ min: 2015, max: 2024 })}/${faker.number.int({ min: 10000, max: 99999 })}`,
      police_station: faker.location.city() + " PS",
      case_status: faker.helpers.arrayElement(["Pending", "Closed", "Convicted"])
    } : null
  };
}

const data = Array.from({ length: 100 }, generatePerson);

fs.writeFileSync('fake_people_data.json', JSON.stringify(data, null, 2), 'utf-8');
console.log('✅ JSON file saved as fake_people_data.json');
