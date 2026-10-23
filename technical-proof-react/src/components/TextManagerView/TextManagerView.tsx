import { useState } from "react";
import type { Item } from "../MainView/types";
import MainView from "../MainView/MainView";
import AddView from "../AddView/AddView";
import { VIEWS, type ViewType } from "../../constants";

export default function TextManagerView() {
  const [items, setItems] = useState<Item[]>([
    { id: "1", text: "Item 1" },
    { id: "2", text: "Item 2" },
    { id: "3", text: "Item 3" },
    { id: "4", text: "Item 4" },
  ]);

  const [historyStack, setHistoryStack] = useState<Item[][]>([]);
  const [currentView, setCurrentView] = useState<ViewType>(VIEWS.MAIN);

  const saveState = (currentItems: Item[]) => {
    setHistoryStack((prev) => [...prev, [...currentItems]]);
  };

  const handleAdd = (text: string) => {
    saveState(items);
    const newItem: Item = {
      id: crypto.randomUUID(),
      text,
    };
    setItems([...items, newItem]);
    setCurrentView(VIEWS.MAIN);
  };

  const handleDeleteItems = (selectedIds: (string | number)[]) => {
    if (selectedIds.length === 0) return;

    saveState(items);
    setItems(items.filter((item) => !selectedIds.includes(item.id)));
  };

  const handleUndo = () => {
    if (historyStack.length === 0) return;

    const previousState = historyStack[historyStack.length - 1];

    setItems(previousState);
    setHistoryStack(historyStack.slice(0, -1));
  };

  return (
    <>
      {currentView === VIEWS.MAIN ? (
        <MainView
          items={items}
          historyLength={historyStack.length}
          onDeleteItems={handleDeleteItems}
          onUndo={handleUndo}
          onNavigateToAdd={() => setCurrentView(VIEWS.ADD)}
        />
      ) : (
        <AddView
          onAdd={handleAdd}
          onCancel={() => setCurrentView(VIEWS.MAIN)}
        />
      )}
    </>
  );
}
