import React, { useState } from 'react';
import axios from 'axios';
import ResultTable from './components/ResultTable';
import type { ResultData } from './types/data';


const App: React.FC = () => {
  const [domain, setDomain] = useState<string>('');
  const [infoType, setInfoType] = useState<string>('domain_info');
  const [data, setData] = useState<ResultData>({
    contactInfo: null,
    domainInfo: null,
});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const isValidDomain = (domain: string) => {
    const regex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,}$/;
    return regex.test(domain);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Check first if user enter a correct domain
    if (!isValidDomain(domain)) {
      setError('Please enter a correct domain (e.g., amazon.com)');
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:9999/api/whois', {
        domain,
        infoType,
      });
      console.log(typeof response.data);

      if (infoType === 'domain_info') {
        setData((prev) => {
          return {
            ...prev,
            domainInfo: response.data,
          };
        });
      } else {
        setData((prev) => {
          return {
            ...prev,
            contactInfo: response.data,
          };
        });
      }
    } catch (err) {
      console.error(err);
      // @ts-expect-error @ts-ignore
      setError(err.response?.data?.error || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="mb-6 text-2xl font-bold text-center">Whois Lookup</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Enter domain name"
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <select
            value={infoType}
            onChange={(e) => setInfoType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="domain_info">Domain Info</option>
            <option value="contact_info">Contact Info</option>
          </select>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white transition bg-blue-600 rounded hover:bg-blue-700"
          >
            {loading ? 'Loading...' : 'Lookup'}
          </button>
        </form>

        {error && <div className="mt-4 text-red-500">{error}</div>}

        {data && <ResultTable data={data} infoType={infoType} />}
      </div>
    </div>
  );
};

export default App;
