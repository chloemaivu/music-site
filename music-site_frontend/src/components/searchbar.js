import React from "react";
import { Select, TextInput, Button } from "flowbite-react";

function Searchbar(props) {
  async function submit(e) {
    e.preventDefault();

    const search = e.target.searchinput.value;
    let filtered = e.target.filter.value;
    if (filtered == "No filter") {
      filtered = "multi";
    }

    props.client.search(filtered, search);
  }

  return (
    <>
      <form onSubmit={(e) => submit(e)}>
        <div className="flex justify-center">
          <div className="flex border w-6/12 background-grey white-text">
            <Select id="filters" name="filter" required={true}>
              <option className="dropdownItem2">No filter</option>
              <option className="dropdownItem">albums</option>
              <option className="dropdownItem">artists</option>
              <option className="dropdownItem">episodes</option>
              <option className="dropdownItem">genres</option>
              <option className="dropdownItem">playlists</option>
              <option className="dropdownItem">podcasts</option>
              <option className="dropdownItem">tracks</option>
              <option className="dropdownItem">users</option>
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
