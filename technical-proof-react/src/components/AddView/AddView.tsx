import type { AddViewProps } from './types';
import './styles.scss';

export default function AddView({
  inputText,
  onInputChange,
  onAdd,
  onCancel,
}: AddViewProps) {
  return (
    <div className="view active">
      <h2>Add item to list</h2>

      <div className="input-wrapper">
        <input
          type="text"
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && inputText.trim() && onAdd()}
          placeholder="Type the text here..."
          autoFocus
        />
      </div>

      <div className="actions-section right-aligned">
        <button
          className="btn-primary"
          onClick={onAdd}
          disabled={inputText.trim() === ''}
        >
          ADD
        </button>
        <button
          className="btn-outline"
          onClick={onCancel}
        >
          CANCEL
        </button>
      </div>
    </div>
  );
}