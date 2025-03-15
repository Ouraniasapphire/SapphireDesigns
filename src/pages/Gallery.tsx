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
      <Card  style={{ display: "flex", "align-items": "center", "justify-content": "center"}} id="gallery-card">
        <img
          src={`${section.image}`}
          alt={`image-${section.id}`}
          id="image-card"
        />
      </Card>
      <br id="spacer" > </br>
    </>
  );

  return (
    <div class="grid-layout" id="gallery-grid" style={"justify-items: center"}>
      <For each={dataState().sections}>{renderSection}</For>
    </div>
  );
};

export default Gallery;
