import { JSX } from "solid-js";

interface CardProps {
  children: JSX.Element;
  class?: string;
  style?: JSX.CSSProperties; 
  id?: string;
}

const Card: (props: CardProps) => JSX.Element = (props) => {
  return (
      <div class={`card ${props.class || ""} glass-panel box-shadow `} style={{...props.style, padding: "40px", height: "fit-content", "max-height": "75vh"}} id={props.id}>
        {props.children}
      </div>
  );
};

export default Card;
