import React from "react";

export default function Button({ text, onClick }) {
  return (
    <button style={{ color: "red" }} onClick={onClick}>
      {text}
    </button>
  );
}
