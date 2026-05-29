import { Issue } from '../types';
import IssueItem from './IssueItem';

interface IssueListProps {
  issues: Issue[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

function IssueList({ issues, onToggle, onDelete }: IssueListProps) {
  if (issues.length === 0) {
    return (
      <div className="empty-state">
        <p>No issues yet. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="issue-list-container">
      <h2>Issues ({issues.length})</h2>
      <ul className="issue-list">
        {issues.map((issue) => (
          <IssueItem
            key={issue.id}
            issue={issue}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default IssueList;
