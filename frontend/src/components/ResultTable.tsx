import React from "react";

type ResultData = {
  domain_name?: string;
  registrar?: string;
  registration_date?: string;
  expiration_date?: string;
  est_domain_age?: string;
  hostnames?: string;
  registrant_name?: string;
  tech_contact_name?: string;
  administrative_contact_name?: string;
  contact_email?: string;
};

const ResultTable: React.FC<{ data: ResultData; infoType: string}> = ({ data, infoType }) => {
  const renderRows = () => {
    console.log(data)
    if (infoType === 'domain_info') {
      console.log('@here');
      return (
        <>
          <tr><td className="border p-2">Domain Name</td><td className="border p-2">{data?.domain_name}</td></tr>
          <tr><td className="border p-2">Registrar</td><td className="border p-2">{data?.registrar}</td></tr>
          <tr><td className="border p-2">Registration Date</td><td className="border p-2">{data?.registration_date}</td></tr>
          <tr><td className="border p-2">Expiration Date</td><td className="border p-2">{data?.expiration_date}</td></tr>
          <tr><td className="border p-2">Estimated Domain Age</td><td className="border p-2">{data?.est_domain_age}</td></tr>
          <tr><td className="border p-2">Hostnames</td><td className="border p-2">{data?.hostnames}</td></tr>
        </>
      );
    } else {
      console.log('@qqqq');
      return (
        <>
          <tr><td className="border p-2">Registrant Name</td><td className="border p-2">{data?.registrant_name}</td></tr>
          <tr><td className="border p-2">Technical Contact Name</td><td className="border p-2">{data?.tech_contact_name}</td></tr>
          <tr><td className="border p-2">Administrative Contact Name</td><td className="border p-2">{data?.administrative_contact_name}</td></tr>
          <tr><td className="border p-2">Contact Email</td><td className="border p-2">{data?.contact_email}</td></tr>
        </>
      );
    }
  };

  return (
    <div className="mt-4 overflow-auto">
      <h2 className="text-lg font-semibold">Results:</h2>
      <table className="min-w-full mt-2 border border-gray-300">
          <thead>
              <tr className="bg-gray-200">
                  <th className="border p-2">{infoType === 'domain_info' ? 'Field' : 'Contact Field'}</th>
                  <th className="border p-2">Value</th>
              </tr>
          </thead>
          <tbody>
              {renderRows()}
          </tbody>
      </table>
    </div>
  );
};

export default ResultTable;