import { useState, useEffect } from "react";
import axios from "axios";

export const TableWithSearch = () => {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&timezone=Asia%2FKolkata"
        );
        setData(response.data.results);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setFilteredData(
      data.filter((dt) =>
        dt.ascii_name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, data]);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search for a city..."
        value={search}
        onChange={handleInputChange}
        className="h-10 w-full m-10"
      />

      <div className="border-4 border-black m-10 p-10">
        <table className="min-w-full divide-y divide-gray-200 ">
          <thead className="bg-gray-50">
            <tr>
              <th className="-ms-10 py-10 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                City Name
              </th>
              <th className="px-10 py-10 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Country
              </th>
              <th className="px-10 py-10 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timezone
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((row, index) => (
              <tr key={index}>
                <td className="px-10 py-10 whitespace-nowrap">
                  {row.ascii_name}
                </td>
                <td className="px-10 py-10 whitespace-nowrap">
                  {row.cou_name_en}
                </td>
                <td className="px-10 py-10 whitespace-nowrap">
                  {row.timezone}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
