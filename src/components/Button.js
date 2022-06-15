import React from "react";

export default function Button({ text, onClick }) {
  return (
    <button style={{ color: "green" }} onClick={onClick}>
      {text}
    </button>
  );
}
