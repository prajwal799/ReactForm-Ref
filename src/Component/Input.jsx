import React, { useRef } from "react";

const Form = () => {
  const ref = useRef(null);
  const handleClick = () => {
    ref.current.focus;
  };
  return (
    <div>
      <form>
        <div>
          <label>Name : </label>
          <input ref={ref} />
        </div>
        <br />
        <button onClick={handleClick}>Submit</button>
      </form>
    </div>
  );
};

export default Form;
