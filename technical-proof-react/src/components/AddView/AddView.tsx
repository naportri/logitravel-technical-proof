import { useState } from "react";
import type { AddViewProps } from "./types";
import "./styles.scss";

export default function AddView({ onAdd, onCancel }: AddViewProps) {
  const [inputText, setInputText] = useState<string>("");

  const handleAddClick = () => {
    const trimmedText = inputText.trim();
    if (!trimmedText) return;
    onAdd(trimmedText);
  };

  return (
    <div className="view active">
      <h2>Add item to list</h2>

      <div className="input-wrapper">
        <label htmlFor="item-input" className="input-label">
          Text content
        </label>
        <input
          id="item-input"
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" && inputText.trim() && handleAddClick()
          }
          placeholder="Type the text here..."
          autoFocus
        />
      </div>

      <div className="actions-section right-aligned">
        <button
          className="btn-primary"
          onClick={handleAddClick}
          disabled={inputText.trim() === ""}
        >
          add
        </button>
        <button className="btn-outline" onClick={onCancel}>
          cancel
        </button>
      </div>
    </div>
  );
}
