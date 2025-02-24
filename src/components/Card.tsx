import { JSX } from "solid-js";

interface CardProps {
  children: JSX.Element;
  class?: string;
  style?: JSX.CSSProperties; 
  id?: string;
}

//Rework the card component styling

const Card: (props: CardProps) => JSX.Element = (props) => {
  return (
      <div class={`card ${props.class || ""} glass-item shadow `} style={{...props.style, padding: "40px", height: "fit-content"}} id={props.id}>
        {props.children}
      </div>
  );
};

export default Card;
