import { createSignal, onMount, For } from "solid-js";
import data from "./gallery-list.json"

import Card from "../components/Card";

const Gallery = () => {
  const [dataState, setDataState] = createSignal({ sections: [] });

  onMount(() => {
    // Set the imported JSON data to the state
    setDataState(data);
  });

  // Render section items
  const renderSection = (section) => (
    <>
      <Card  style={{ display: "flex", "align-items": "center", "justify-content": "center", height: "100%"}}>
        <img
          src={`${section.image}`}
          alt={`image-${section.id}`}
          id="gallery-logo"
        />
      </Card>
      <Card style={{"text-align": "center"}}>
        <h1 style={"color: #0084FF; font-size: 3rem;" }>{section.title}</h1>
        <br />
        <div class="gallery-text">
          <h3>
            <For each={section.description.split("\n")}>
              {(line) => (
                <>
                  {line}
                  <br />
                  <br />
                </>
              )}
            </For>
          </h3>
        </div>
      </Card>
      <br id="space"/>
    </>
  );

  return (
    <div class="grid-container" style={"justify-items: center"}>
      <For each={dataState().sections}>{renderSection}</For>
    </div>
  );
};

export default Gallery;
