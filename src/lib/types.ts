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

export const roleDisplayName = (role: UserRole) => {
    switch (role) {
        case 'station_head': return 'Station Head';
        case 'creative': return 'Creative';
        case 'technical': return 'Technical';
        case 'pr': return 'PR';
        case 'designing': return 'Designing';
        case 'video_editing': return 'Video Editing';
        case 'rj': return 'RJ';
        case 'broadcasting': return 'Broadcasting';
        default: return 'Guest';
    }
}

export type User = {
  id: string;
  name: string;
  username: string;
  role: UserRole;
  avatarId: string;
};

export type NewsItem = {
    id: string;
    title: string;
    content: string;
    source: string;
    lastEdited: string;
    isLive?: boolean;
};
