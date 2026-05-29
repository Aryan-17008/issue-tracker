import { Issue } from '../types';

interface IssueItemProps {
  issue: Issue;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function IssueItem({ issue, onToggle, onDelete }: IssueItemProps) {
  return (
    <li className={`issue-item ${issue.status}`}>
      <div className="issue-content">
        <div className="issue-header">
          <span className={`issue-status status-${issue.status}`}>
            {issue.status}
          </span>
          <span className={`issue-priority priority-${issue.priority}`}>
            {issue.priority}
          </span>
          <span className="issue-date">
            {new Date(issue.createdAt).toLocaleDateString()}
          </span>
        </div>
        <h3 className="issue-title">{issue.title}</h3>
        {issue.description && (
          <p className="issue-description">{issue.description}</p>
        )}
      </div>
      <div className="issue-actions">
        <button
          className="btn-toggle"
          onClick={() => onToggle(issue.id)}
        >
          {issue.status === 'open' ? 'Close' : 'Reopen'}
        </button>
        <button
          className="btn-delete"
          onClick={() => onDelete(issue.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default IssueItem;
