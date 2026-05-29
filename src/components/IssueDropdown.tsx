import { useState } from 'react';
import { Issue } from '../types';

interface IssueDropdownProps {
  issues: Issue[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (issue: Issue) => void;
}

function IssueDropdown({ issues, onToggle, onDelete, onEdit }: IssueDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const openCount = issues.filter(i => i.status === 'open').length;

  return (
    <div className="issue-dropdown">
      <button 
        className="dropdown-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="dropdown-icon">{isOpen ? '▼' : '▶'}</span>
        <span className="dropdown-text">
          {isOpen ? 'Hide All Issues' : `Show All Issues (${issues.length})`}
        </span>
        <span className="dropdown-badge">{openCount} open</span>
      </button>

      {isOpen && (
        <div className="dropdown-panel">
          {issues.length === 0 ? (
            <div className="dropdown-empty">No issues yet</div>
          ) : (
            <ul className="dropdown-list">
              {issues.map((issue) => (
                <li key={issue.id} className={`dropdown-item ${issue.status}`}>
                  <div className="dropdown-item-content">
                    <span className={`dropdown-status status-${issue.status}`}>
                      {issue.status}
                    </span>
                    <span className={`dropdown-priority priority-${issue.priority}`}>
                      {issue.priority}
                    </span>
                    <span className="dropdown-title">{issue.title}</span>
                    <span className="dropdown-date">
                      {new Date(issue.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="dropdown-actions">
                    <button
                      className="btn-edit-sm"
                      onClick={() => onEdit(issue)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn-toggle-sm"
                      onClick={() => onToggle(issue.id)}
                    >
                      {issue.status === 'open' ? 'Close' : 'Reopen'}
                    </button>
                    <button
                      className="btn-delete-sm"
                      onClick={() => onDelete(issue.id)}
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default IssueDropdown;
