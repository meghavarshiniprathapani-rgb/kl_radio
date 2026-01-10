export type Announcement = {
  id: string;
  title: string;
  content: string;
  author: string;
  authorAvatar: string;
  date: string;
  status: 'Draft' | 'Published' | 'Archived';
};

export type SongSuggestion = {
  id: string;
  name: string;
  songTitle: string;
  movie: string;
  submittedAt: string;
  status: 'Pending' | 'Played' | 'Rejected';
};

export type UserRole = 'station_head' | 'creative' | 'technical' | 'pr' | 'designing' | 'video_editing' | 'rj' | 'broadcasting' | 'guest';

export type User = {
  id: string;
  name: string;
  username: string;
  role: UserRole;
  avatarId: string;
};
