import React from "react";
import { Accordion } from "flowbite-react";

function SearchResult(props) {
  const result = props.search.items
  console.log(result)
  return (
    <>
      <Accordion alwaysOpen={true}>

{/* can create multiple panels, depending on how many search results returned */}
        <Accordion.Panel>
          <Accordion.Title>Search result</Accordion.Title>
          <Accordion.Content>
            <p className="text-gray-500 dark:text-gray-400">
              Expands to reveal more information.
            </p>
          </Accordion.Content>
        </Accordion.Panel>

      </Accordion>
    </>
  );
}

export default SearchResult;
