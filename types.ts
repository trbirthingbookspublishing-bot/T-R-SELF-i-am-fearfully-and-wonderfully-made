export interface Book {
  id: string;
  title: string;
  authorId: string;
  coverUrl: string;
  description: string;
  price: number;
  genre: string;
}

export interface Author {
  id: string;
  name: string;
  bio: string;
  photoUrl: string;
  role: 'Author' | 'Team Member' | 'Founder';
}

export interface ServicePackage {
  id: string;
  title: string;
  price: string;
  features: string[];
  isPopular?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
}

export interface Interview {
  id: string;
  title: string;
  interviewee: string;
  thumbnailUrl: string;
  videoUrl: string; // In a real app, this would be a youtube/vimeo ID
  date: string;
}

export interface AppointmentSlot {
  id: string;
  time: string;
  available: boolean;
}