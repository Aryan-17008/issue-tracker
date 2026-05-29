import { SortOption } from '../types';

interface SortDropdownProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

function SortDropdown({ sortBy, onSortChange }: SortDropdownProps) {
  return (
    <div className="sort-dropdown">
      <label htmlFor="sort">Sort by</label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
      >
        <option value="newest">Newest First</option>
        <option value="oldest">Oldest First</option>
      </select>
    </div>
  );
}

export default SortDropdown;
