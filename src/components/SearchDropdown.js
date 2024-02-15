import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

import "./SearchDropdown.css";

const SearchDropdown = () => {
  const [selectedOptions, setSelectedOptions] = useState();
  const [item, setItem] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get("https://api.github.com/languages");
        //here we can limit on data
        const limitedData = data.slice(0, 10);
        console.log(limitedData);
        setItem(data);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };

    fetchData();
  }, []);

  const options = item.map((language) => ({
    value: language.name,
    label: language.name,
  }));

  function handleSelect(data) {
    setSelectedOptions(data);
  }

  return (
    <div className="search-container">
      <form className="form">
        <div className="heading">
          <p>Select Dropdown with Search and Multi-select</p>
        </div>
        <Select
          options={options}
          placeholder="Select languages..."
          value={selectedOptions}
          onChange={handleSelect}
          isSearchable={true}
          isMulti
          className="searchSelect"
        />
      </form>
    </div>
  );
};

export default SearchDropdown;
