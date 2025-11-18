export interface Video {
  id: string;
  title: string;
  duration: string;
}

export interface PDF {
  id: string;
  title: string;
  size: string;
  pages: number;
}

export interface CourseContent {
  id: string;
  title: string;
  videos: Video[];
  pdfs: PDF[];
}

export interface Courses {
  _id: string;
  name: string;
  modules: number;
  slug: string;
}

export interface Course {
  _id: string;
  name: string;
  typeCounts: {
    video: number;
    pdf: number;
  };
}
