import React from "react";
import "../css/Navigation.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const Navigation = (props) => {
  return (
    <div className="navigator">
      <MdChevronLeft
        onClick={props.onPrev}
        className="btn--nav"
        size={"2rem"}
      />
      {props.date ? <p>{props.date}</p> : <p></p>}
      <MdChevronRight
        onClick={props.onNext}
        className="btn--nav"
        size={"2rem"}
      />
    </div>
  );
};

export default Navigation;
