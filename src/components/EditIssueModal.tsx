import { useState } from 'react';
import { Issue, IssuePriority } from '../types';

interface EditIssueModalProps {
  issue: Issue;
  onSave: (id: string, title: string, description: string, priority: IssuePriority) => void;
  onCancel: () => void;
}

function EditIssueModal({ issue, onSave, onCancel }: EditIssueModalProps) {
  const [title, setTitle] = useState(issue.title);
  const [description, setDescription] = useState(issue.description);
  const [priority, setPriority] = useState<IssuePriority>(issue.priority);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave(issue.id, title.trim(), description.trim(), priority);
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>✏️ Edit Issue</h2>
          <button className="modal-close" onClick={onCancel}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Issue title..."
              required
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Issue description..."
              rows={4}
            />
          </div>

          <div className="form-group">
            <label>Priority</label>
            <div className="priority-options">
              {(['low', 'medium', 'high'] as IssuePriority[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`priority-option ${p} ${priority === p ? 'selected' : ''}`}
                  onClick={() => setPriority(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-save">
              💾 Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditIssueModal;
