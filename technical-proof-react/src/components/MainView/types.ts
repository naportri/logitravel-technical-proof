export interface Item {
  id: number;
  text: string;
}

export interface MainViewProps {
  items: Item[];
  selectedIds: number[];
  historyLength: number;
  onItemClick: (id: number) => void;
  onItemDoubleClick: (id: number) => void;
  onUndo: () => void;
  onDelete: () => void;
  onNavigateToAdd: () => void;
}
