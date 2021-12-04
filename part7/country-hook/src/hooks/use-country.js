import { useEffect, useState } from 'react';
import axios from 'axios';

const url = 'https://restcountries.com/v2/name';

const useCountry = name => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const getCountry = async () => {
      try {
        const response = await axios.get(`${url}/${name}?fullText=true`);
        console.log(response.data[0].flag);
        setCountry({ found: true, ...response.data[0] });
      } catch {
        setCountry({ found: false });
      }
    };
    name && getCountry();
  }, [name]);
  return country;
};

export default useCountry;
