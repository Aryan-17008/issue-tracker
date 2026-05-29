export type IssueStatus = 'open' | 'closed';
export type IssuePriority = 'low' | 'medium' | 'high';

export interface Issue {
  id: string;
  title: string;
  description: string;
  status: IssueStatus;
  priority: IssuePriority;
  createdAt: number;
}

export type SortOption = 'newest' | 'oldest';
export type StatusFilter = 'all' | IssueStatus;

export interface ThemeColors {
  primary: string;
  primaryHover: string;
  bg: string;
  surface: string;
  text: string;
  textSecondary: string;
  border: string;
  openBg: string;
  openText: string;
  closedBg: string;
  closedText: string;
  lowBg: string;
  lowText: string;
  mediumBg: string;
  mediumText: string;
  highBg: string;
  highText: string;
  fontFamily: string;
}
