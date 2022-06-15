import React from "react";

export default function Button({ text, onClick }) {
  return (
    <button onClick={onClick} style={{ color: "red" }}>
      just the two of us
    </button>
  );
}
