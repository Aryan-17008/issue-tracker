import { useState, useEffect, useMemo, useCallback } from 'react';
import { Issue, SortOption, StatusFilter, ThemeColors } from './types';
import IssueForm from './components/IssueForm';
import IssueDropdown from './components/IssueDropdown';
import EditIssueModal from './components/EditIssueModal';
import FilterBar from './components/FilterBar';
import SortDropdown from './components/SortDropdown';
import ColorPalette from './components/ColorPalette';
import CelebrationPopup from './components/CelebrationPopup';
import './App.css';

const STORAGE_KEY = 'issue-tracker-data';
const THEME_KEY = 'issue-tracker-theme';

const defaultTheme: ThemeColors = {
  primary: '#ff6600',
  primaryHover: '#e55a00',
  bg: '#ff8c00',
  surface: '#ffffff',
  text: '#1a0a00',
  textSecondary: '#4d2600',
  border: '#cc5200',
  openBg: '#ffaa33',
  openText: '#802e00',
  closedBg: '#66cc66',
  closedText: '#004d00',
  lowBg: '#ffcc66',
  lowText: '#664400',
  mediumBg: '#ff9933',
  mediumText: '#803300',
  highBg: '#ff4444',
  highText: '#660000',
  fontFamily: "'Bangers', 'Impact', 'Arial Black', cursive",
};

interface PopupState {
  show: boolean;
  message: string;
  emoji: string;
}

function loadIssues(): Issue[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return parsed.map((issue: any) => ({
      ...issue,
      priority: issue.priority || 'medium',
    }));
  } catch {
    return [];
  }
}

function saveIssues(issues: Issue[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(issues));
}

function loadTheme(): { name: string; colors: ThemeColors } {
  try {
    const raw = localStorage.getItem(THEME_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return { name: 'naruto', colors: defaultTheme };
}

function saveTheme(name: string, colors: ThemeColors) {
  localStorage.setItem(THEME_KEY, JSON.stringify({ name, colors }));
}

// Celebration messages for creating issues
const createMessages = [
  { msg: 'New mission accepted!', emoji: '📜' },
  { msg: 'Quest added!', emoji: '⚔️' },
  { msg: 'Challenge registered!', emoji: '💪' },
  { msg: 'New adventure begins!', emoji: '🗺️' },
  { msg: 'Mission start!', emoji: '🚀' },
];

// Celebration messages for closing issues
const closeMessages = [
  { msg: 'Mission complete!', emoji: '🏆' },
  { msg: 'Victory!', emoji: '✨' },
  { msg: 'Quest cleared!', emoji: '🎉' },
  { msg: 'Boss defeated!', emoji: '👑' },
  { msg: 'Level up!', emoji: '⭐' },
];

// Celebration messages for reopening issues
const reopenMessages = [
  { msg: 'Round 2! Fight!', emoji: '🔥' },
  { msg: 'Revived!', emoji: '💫' },
  { msg: 'Here we go again!', emoji: '💥' },
  { msg: 'Never give up!', emoji: '🌟' },
];

// Celebration messages for editing issues
const editMessages = [
  { msg: 'Mission updated!', emoji: '📝' },
  { msg: 'Strategy revised!', emoji: '🎯' },
  { msg: 'Plan optimized!', emoji: '⚡' },
  { msg: 'Intel updated!', emoji: '📡' },
];

function App() {
  const [issues, setIssues] = useState<Issue[]>(loadIssues);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [theme, setTheme] = useState(loadTheme);
  const [popup, setPopup] = useState<PopupState>({ show: false, message: '', emoji: '' });
  const [editingIssue, setEditingIssue] = useState<Issue | null>(null);

  useEffect(() => {
    saveIssues(issues);
  }, [issues]);

  useEffect(() => {
    const root = document.documentElement;
    const colors = theme.colors;
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-primary-hover', colors.primaryHover);
    root.style.setProperty('--color-bg', colors.bg);
    root.style.setProperty('--color-surface', colors.surface);
    root.style.setProperty('--color-text', colors.text);
    root.style.setProperty('--color-text-secondary', colors.textSecondary);
    root.style.setProperty('--color-border', colors.border);
    root.style.setProperty('--color-open-bg', colors.openBg);
    root.style.setProperty('--color-open-text', colors.openText);
    root.style.setProperty('--color-closed-bg', colors.closedBg);
    root.style.setProperty('--color-closed-text', colors.closedText);
    root.style.setProperty('--color-low-bg', colors.lowBg);
    root.style.setProperty('--color-low-text', colors.lowText);
    root.style.setProperty('--color-medium-bg', colors.mediumBg);
    root.style.setProperty('--color-medium-text', colors.mediumText);
    root.style.setProperty('--color-high-bg', colors.highBg);
    root.style.setProperty('--color-high-text', colors.highText);
    root.style.setProperty('--font-family', colors.fontFamily);
  }, [theme]);

  const showPopup = useCallback((message: string, emoji: string) => {
    setPopup({ show: true, message, emoji });
  }, []);

  const hidePopup = useCallback(() => {
    setPopup({ show: false, message: '', emoji: '' });
  }, []);

  const addIssue = (title: string, description: string, priority: 'low' | 'medium' | 'high') => {
    const newIssue: Issue = {
      id: crypto.randomUUID(),
      title,
      description,
      status: 'open',
      priority,
      createdAt: Date.now(),
    };
    setIssues((prev) => [newIssue, ...prev]);
    
    // Show random celebration
    const random = createMessages[Math.floor(Math.random() * createMessages.length)];
    showPopup(random.msg, random.emoji);
  };

  const toggleStatus = (id: string) => {
    setIssues((prev) =>
      prev.map((issue) => {
        if (issue.id === id) {
          const newStatus = issue.status === 'open' ? 'closed' : 'open';
          
          // Show celebration popup
          if (newStatus === 'closed') {
            const random = closeMessages[Math.floor(Math.random() * closeMessages.length)];
            showPopup(random.msg, random.emoji);
          } else {
            const random = reopenMessages[Math.floor(Math.random() * reopenMessages.length)];
            showPopup(random.msg, random.emoji);
          }
          
          return { ...issue, status: newStatus };
        }
        return issue;
      })
    );
  };

  const deleteIssue = (id: string) => {
    setIssues((prev) => prev.filter((issue) => issue.id !== id));
  };

  const handleEdit = (issue: Issue) => {
    setEditingIssue(issue);
  };

  const handleSaveEdit = (id: string, title: string, description: string, priority: 'low' | 'medium' | 'high') => {
    setIssues((prev) =>
      prev.map((issue) =>
        issue.id === id ? { ...issue, title, description, priority } : issue
      )
    );
    setEditingIssue(null);
    
    // Show celebration popup
    const random = editMessages[Math.floor(Math.random() * editMessages.length)];
    showPopup(random.msg, random.emoji);
  };

  const handleCancelEdit = () => {
    setEditingIssue(null);
  };

  const handleThemeChange = (name: string, colors: ThemeColors) => {
    setTheme({ name, colors });
    saveTheme(name, colors);
    showPopup(`Theme changed to ${name}!`, '🎨');
  };

  const filteredIssues = useMemo(() => {
    let result = [...issues];

    if (statusFilter !== 'all') {
      result = result.filter((issue) => issue.status === statusFilter);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (issue) =>
          issue.title.toLowerCase().includes(query) ||
          issue.description.toLowerCase().includes(query)
      );
    }

    result.sort((a, b) => {
      if (sortBy === 'newest') return b.createdAt - a.createdAt;
      return a.createdAt - b.createdAt;
    });

    return result;
  }, [issues, statusFilter, searchQuery, sortBy]);

  const openCount = issues.filter((i) => i.status === 'open').length;
  const closedCount = issues.filter((i) => i.status === 'closed').length;

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <h1>🎯 Issue Tracker</h1>
          <span className="issue-count">
            {openCount} open / {closedCount} closed / {issues.length} total
          </span>
        </div>
        <div className="header-right">
          <ColorPalette
            currentTheme={theme.name}
            onThemeChange={handleThemeChange}
          />
        </div>
      </header>

      <main className="app-main">
        <IssueForm onAdd={addIssue} />

        <div className="controls-bar">
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            statusFilter={statusFilter}
            onStatusFilterChange={setStatusFilter}
            resultCount={filteredIssues.length}
          />
          <SortDropdown sortBy={sortBy} onSortChange={setSortBy} />
        </div>

        <IssueDropdown
          issues={filteredIssues}
          onToggle={toggleStatus}
          onDelete={deleteIssue}
          onEdit={handleEdit}
        />
      </main>

      {popup.show && (
        <CelebrationPopup
          message={popup.message}
          emoji={popup.emoji}
          onClose={hidePopup}
        />
      )}

      {editingIssue && (
        <EditIssueModal
          issue={editingIssue}
          onSave={handleSaveEdit}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  );
}

export default App;
