import React, { useState } from "react";
import { Select, TextInput, Button } from "flowbite-react";

function Searchbar(props) {
  let fetched = ({name: "hello"})

  async function submit(e) {
    e.preventDefault();

    const search = e.target.searchinput.value;
    let filtered = e.target.filter.value;
    if (filtered == "No filter") {
      filtered = "multi";
    }
    const fetched = await props.client.search(filtered, search);
    props.searchFetch(fetched.data)
  }

  return (
    <>
      <form onSubmit={(e) => submit(e)}>
        <div className="flex justify-center">
          <div className="flex border w-6/12 background-grey white-text">
            <Select id="filters" name="filter" required={true}>
              {/* <option className="dropdownItem2">no filter</option> */}
              <option className="dropdownItem">albums</option>
              <option className="dropdownItem">artists</option>
              <option className="dropdownItem">genres</option>
              <option className="dropdownItem">playlists</option>
              <option className="dropdownItem">tracks</option>
            </Select>

            <div className="h-full">
              <TextInput
                id="searchinput"
                name="searchinput"
                placeholder="Search"
                required={true}
              />
            </div>
          </div>
          <Button
            className="h-full"
            outline={true}
            gradientDuoTone="cyanToBlue"
            type="submit"
          >
            Search
          </Button>
        </div>
      </form>
    </>
  );
}

export default Searchbar;
