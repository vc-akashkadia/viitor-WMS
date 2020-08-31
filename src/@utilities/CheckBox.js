import React from "react";

export default function CheckBox({ isSelected, onChange, children }) {
  return (
    <>
      <input type="checkbox" style={{ display: "none" }} />
      <label className="checkbox checkbox-lg checkbox-single">
        {children}
        <input type="checkbox" checked={isSelected} onChange={onChange} />

        <span />
      </label>
    </>
  );
}
