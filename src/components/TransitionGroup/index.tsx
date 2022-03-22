import { ReactElement, useEffect, useState } from "react"
import { Location, useLocation } from "react-router-dom";

type Props = {children: (path: Location) => ReactElement}

const TransitionGroup = (props: Props) => {
  const location = useLocation();
  const [actualPath, setActualPath] = useState(location);
  const [transitionStage, setTransistionStage] = useState("fade-in");

  useEffect(() => {
    console.log(location.pathname, actualPath.pathname)
    if (location !== actualPath) setTransistionStage("fade-out");
  }, [location, actualPath]);

  const onAnimationEnd = () => {
    console.log(transitionStage)
    if (transitionStage === "fade-out") {
      setTransistionStage("fade-in");
      setActualPath(location);
    }
  }
  return (
    <div
      className={`${transitionStage}`}
      onAnimationEnd={onAnimationEnd}
    >
      {props.children(actualPath)}
    </div>
  )
}

export default TransitionGroup