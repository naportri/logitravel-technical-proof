import { useState } from "react";
import type { MainViewProps } from "./types";
import "./styles.scss";

export default function MainView({
  items,
  historyLength,
  onDeleteItems,
  onUndo,
  onNavigateToAdd,
}: MainViewProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleItemClick = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleItemDoubleClick = (id: string) => {
    onDeleteItems([id]);
    setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
  };

  const handleDeleteClick = () => {
    if (selectedIds.length === 0) return;
    onDeleteItems(selectedIds);
    setSelectedIds([]);
  };

  const handleUndoClick = () => {
    onUndo();
    setSelectedIds([]);
  };

  return (
    <div className="view active">
      <h1>This is a technical proof</h1>
      <p className="subtitle">
        Lorem ipsum dolor sit amet consectetur adipiscing, elit mus primis nec
        inceptos. Lacinia habitasse arcu molestie maecenas cursus quam nunc,
        hendrerit posuere augue fames dictumst placerat porttitor, dis mi
        pharetra vestibulum venenatis phasellus.
      </p>

      <div className="list-container">
        <ul>
          {items.map((item) => (
            <li
              key={item.id}
              className={selectedIds.includes(item.id) ? "selected" : ""}
              onClick={() => handleItemClick(item.id)}
              onDoubleClick={() => handleItemDoubleClick(item.id)}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>

      <div className="actions-section">
        <div className="left-actions">
          <button
            className="btn-icon"
            title="Deshacer"
            onClick={handleUndoClick}
            disabled={historyLength === 0}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 7v6h6"></path>
              <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"></path>
            </svg>
          </button>
          <button
            className="btn-outline"
            onClick={handleDeleteClick}
            disabled={selectedIds.length === 0}
          >
            delete
          </button>
        </div>
        <button className="btn-primary" onClick={onNavigateToAdd}>
          add
        </button>
      </div>
    </div>
  );
}
