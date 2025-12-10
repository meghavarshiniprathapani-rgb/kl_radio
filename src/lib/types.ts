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
  artist: string;
  submittedAt: string;
  status: 'Pending' | 'Approved' | 'Rejected';
};
