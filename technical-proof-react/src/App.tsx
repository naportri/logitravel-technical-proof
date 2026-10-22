import { useState } from "react";
import "./App.scss";
import type { Item } from "./components/MainView/types";
import MainView from "./components/MainView/MainView";
import AddView from "./components/AddView/AddView";

export default function App() {
  const [items, setItems] = useState<Item[]>([
    { id: 1, text: "Item 1" },
    { id: 2, text: "Item 2" },
    { id: 3, text: "Item 3" },
    { id: 4, text: "Item 4" },
  ]);

  const [historyStack, setHistoryStack] = useState<string[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [currentView, setCurrentView] = useState<"main" | "add">("main");
  const [inputText, setInputText] = useState<string>("");

  const saveState = (currentItems: Item[]) => {
    setHistoryStack((prev) => [...prev, JSON.stringify(currentItems)]);
  };

  const handleItemClick = (id: number) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleItemDoubleClick = (id: number) => {
    saveState(items);
    setItems(items.filter((item) => item.id !== id));
    setSelectedIds(selectedIds.filter((itemId) => itemId !== id));
  };

  const handleAdd = () => {
    const trimmedText = inputText.trim();
    if (!trimmedText) return;

    saveState(items);
    setItems([...items, { id: Date.now(), text: trimmedText }]);
    setInputText("");
    setCurrentView("main");
  };

  const handleDelete = () => {
    if (selectedIds.length === 0) return;

    saveState(items);
    setItems(items.filter((item) => !selectedIds.includes(item.id)));
    setSelectedIds([]);
  };

  const handleUndo = () => {
    if (historyStack.length === 0) return;

    const previousStateString = historyStack[historyStack.length - 1];
    const previousState: Item[] = JSON.parse(previousStateString);

    setItems(previousState);
    setHistoryStack(historyStack.slice(0, -1));
    setSelectedIds([]);
  };

  return (
    <div className="app-container">
      {currentView === "main" ? (
        <MainView
          items={items}
          selectedIds={selectedIds}
          historyLength={historyStack.length}
          onItemClick={handleItemClick}
          onItemDoubleClick={handleItemDoubleClick}
          onUndo={handleUndo}
          onDelete={handleDelete}
          onNavigateToAdd={() => setCurrentView("add")}
        />
      ) : (
        <AddView
          inputText={inputText}
          onInputChange={setInputText}
          onAdd={handleAdd}
          onCancel={() => {
            setInputText("");
            setCurrentView("main");
          }}
        />
      )}
    </div>
  );
}
