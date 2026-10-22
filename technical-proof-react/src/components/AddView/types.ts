export interface AddViewProps {
  inputText: string;
  onInputChange: (text: string) => void;
  onAdd: () => void;
  onCancel: () => void;
}