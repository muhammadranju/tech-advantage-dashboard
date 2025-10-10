export interface Playlist {
  _id: string;
  title: string;
  videos?: Video[];
}
export interface Video {
  _id: string;
  title: string;
  filename: string;
  filepath: string;
  url: string;
  category: string;
  mark: number;
  duration: number;
  views: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
