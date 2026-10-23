export interface Item {
  id: string;
  text: string;
}
export interface MainViewProps {
  items: Item[];
  historyLength: number;
  onDeleteItems: (ids: string[]) => void;
  onUndo: () => void;
  onNavigateToAdd: () => void;
}
