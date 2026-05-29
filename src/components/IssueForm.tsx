import { useState } from 'react';
import { IssuePriority } from '../types';

interface IssueFormProps {
  onAdd: (title: string, description: string, priority: IssuePriority) => void;
}

function IssueForm({ onAdd }: IssueFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<IssuePriority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAdd(title.trim(), description.trim(), priority);
    setTitle('');
    setDescription('');
    setPriority('medium');
  };

  return (
    <form className="issue-form" onSubmit={handleSubmit}>
      <h2>Add New Issue</h2>
      <div className="form-row">
        <div className="form-group form-group-title">
          <label htmlFor="title">Title *</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Issue title"
            required
          />
        </div>
        <div className="form-group form-group-priority">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as IssuePriority)}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional description"
          rows={3}
        />
      </div>
      <button type="submit" className="btn-primary">
        Add Issue
      </button>
    </form>
  );
}

export default IssueForm;
