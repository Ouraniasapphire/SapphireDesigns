import { JSX } from "solid-js";

interface CardProps {
  children: JSX.Element;
  class?: string;
  style?: JSX.CSSProperties; // style in SolidJS
  id?: string;
}

const Card: (props: CardProps) => JSX.Element = (props) => {
  return (
    <div class="glass-item fit-w fit-h shadow" style={"padding: 40px"}>
      <div class={`card ${props.class || ""}`} style={props.style} id={props.id}>
        {props.children}
      </div>
    </div>
  );
};

export default Card;
