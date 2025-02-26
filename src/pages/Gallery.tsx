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
      <Card  style={{ display: "flex", "align-items": "center", "justify-content": "center"}} id="G-card-log">
        <img
          src={`${section.image}`}
          alt={`image-${section.id}`}
          id="card-image"
        />
      </Card>
      <br id="space" > </br>
    </>
  );

  return (
    <div class="grid-item-container" style={"justify-items: center"}>
      <For each={dataState().sections}>{renderSection}</For>
    </div>
  );
};

export default Gallery;
