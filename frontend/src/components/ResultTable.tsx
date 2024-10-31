import React from 'react';
import type { ResultData } from '../types/data';

const ResultTable: React.FC<{ data: ResultData; infoType: string }> = ({
  data,
  infoType,
}) => {
  
  if (infoType === 'domain_info' && !data.domainInfo) {
    return null;
  }

  if (infoType === 'contact_info' && !data.contactInfo) {
    return null;
  }

  const renderRows = () => {
    console.log(data);
    if (infoType === 'domain_info') {
      console.log('@here');
      return (
        <>
          <tr>
            <td className="p-2 border">Domain Name</td>
            <td className="p-2 border">{data.domainInfo?.domain_name}</td>
          </tr>
          <tr>
            <td className="p-2 border">Registrar</td>
            <td className="p-2 border">{data.domainInfo?.registrar}</td>
          </tr>
          <tr>
            <td className="p-2 border">Registration Date</td>
            <td className="p-2 border">{data.domainInfo?.registration_date}</td>
          </tr>
          <tr>
            <td className="p-2 border">Expiration Date</td>
            <td className="p-2 border">{data.domainInfo?.expiration_date}</td>
          </tr>
          <tr>
            <td className="p-2 border">Estimated Domain Age</td>
            <td className="p-2 border">{data.domainInfo?.est_domain_age}</td>
          </tr>
          <tr>
            <td className="p-2 border">Hostnames</td>
            <td className="p-2 border">{data.domainInfo?.hostnames}</td>
          </tr>
        </>
      );
    } else {
      console.log('@qqqq');
      return (
        <>
          <tr>
            <td className="p-2 border">Registrant Name</td>
            <td className="p-2 border">{data.contactInfo?.registrant_name}</td>
          </tr>
          <tr>
            <td className="p-2 border">Technical Contact Name</td>
            <td className="p-2 border">{data.contactInfo?.tech_contact_name}</td>
          </tr>
          <tr>
            <td className="p-2 border">Administrative Contact Name</td>
            <td className="p-2 border">{data.contactInfo?.administrative_contact_name}</td>
          </tr>
          <tr>
            <td className="p-2 border">Contact Email</td>
            <td className="p-2 border">{data.contactInfo?.contact_email}</td>
          </tr>
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
            <th className="p-2 border">
              {infoType === 'domain_info' ? 'Field' : 'Contact Field'}
            </th>
            <th className="p-2 border">Value</th>
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
};

export default ResultTable;
