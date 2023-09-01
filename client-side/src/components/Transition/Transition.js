import "../Animation.css";
import { CSSTransition } from "react-transition-group";
import useRender from "../../hooks/useRender";
const Transition = (props) => {
  const initialRender = useRender();
  return (
    <CSSTransition
      in={!initialRender}
      timeout={1500}
      classNames="fade"
      unmountOnExit
    >
      <div className={"animated-container"}>{props.children}</div>
    </CSSTransition>
  );
};

export default Transition;
