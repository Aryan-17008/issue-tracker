import { StatusFilter } from '../types';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: StatusFilter;
  onStatusFilterChange: (status: StatusFilter) => void;
  resultCount: number;
}

function FilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  resultCount,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label htmlFor="search">Search</label>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by title or description..."
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="status-filter">Status</label>
        <div className="status-filter-buttons">
          <button
            className={`filter-btn ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => onStatusFilterChange('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${statusFilter === 'open' ? 'active' : ''}`}
            onClick={() => onStatusFilterChange('open')}
          >
            Open
          </button>
          <button
            className={`filter-btn ${statusFilter === 'closed' ? 'active' : ''}`}
            onClick={() => onStatusFilterChange('closed')}
          >
            Closed
          </button>
        </div>
      </div>

      <div className="result-count">
        {resultCount} issue{resultCount !== 1 ? 's' : ''}
      </div>
    </div>
  );
}

export default FilterBar;
