import { useEffect } from "react";
import axios from "axios";
export const Table = () => {
  useEffect(() => {
    axios
      .get("https://public.opendatasoft.com/explore/dataset/geonames-all-cities-with-a-population-1000/api/?disjunctive.cou_name_en&sort=name")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return <></>;
};
