import { useState, useEffect } from "react";
import axios from "axios";


interface Data {
  city: number;
  country: string;
  timezone: number;
}
// const data: Data[] = [
//   {
//     city: 1,
//     country: "India",
//     timezone: 46000,
//   },
//   {
//     city: 1,
//     country: "US",
//     timezone: 46000,
//   },
//   {
//     city: 1,
//     country: "Australia",
//     timezone: 46000,
//   },
// ];
// city,country,Timezone


export const Table = () => {
  const [data, setData] = useState<Data[]>([]);
  useEffect(() => {
    const Fetchdata = axios
      .get(
        "https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=20&timezone=Asia%2FKolkata"
      )
      .then((response) => {
        setData(response.data)
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  console.log(data);
 
   
    console.log(data);
  return (
    <>
     <table className="border-4 border-black">
      <thead>
        <tr>
          <td>City name</td>
          <td>Country</td>
          <td>Timezone</td>
        </tr>
      </thead>
     </table>
    </>
  );
};
