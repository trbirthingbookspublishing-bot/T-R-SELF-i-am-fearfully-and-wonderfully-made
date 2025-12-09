import { Book, Author, ServicePackage, Testimonial, Interview } from './types';

export const BOOKS: Book[] = [
  {
    id: '1',
    title: 'Whispers of the Plains',
    authorId: 'a1',
    coverUrl: 'https://picsum.photos/300/450?random=1',
    description: 'A stirring narrative set in the heart of West Texas, exploring family legacies.',
    price: 24.99,
    genre: 'Historical Fiction'
  },
  {
    id: '2',
    title: 'Birthing Dreams',
    authorId: 'a2',
    coverUrl: 'https://picsum.photos/300/450?random=2',
    description: 'A guide to manifesting your creative potential and birthing your book into the world.',
    price: 19.99,
    genre: 'Self-Help'
  },
  {
    id: '3',
    title: 'The Lubbock Light',
    authorId: 'a3',
    coverUrl: 'https://picsum.photos/300/450?random=3',
    description: 'A mystery thriller involving the mysterious lights of the Texas panhandle.',
    price: 15.50,
    genre: 'Mystery'
  },
  {
    id: '4',
    title: 'Golden Horizons',
    authorId: 'a1',
    coverUrl: 'https://picsum.photos/300/450?random=4',
    description: 'Poetry collection capturing the stunning sunsets of the Southwest.',
    price: 12.00,
    genre: 'Poetry'
  }
];

export const AUTHORS: Author[] = [
  {
    id: 'a1',
    name: 'Sarah Jenkins',
    bio: 'Award-winning novelist based in Lubbock with a passion for historical accuracy.',
    photoUrl: 'https://picsum.photos/200/200?random=10',
    role: 'Author'
  },
  {
    id: 'a2',
    name: 'Dr. Marcus Thorne',
    bio: 'Speaker, mentor, and expert in creative leadership.',
    photoUrl: 'https://picsum.photos/200/200?random=11',
    role: 'Author'
  },
  {
    id: 't1',
    name: 'Tamara Richardson',
    bio: 'Founder & CEO. Dedicated to helping voices be heard across Texas and beyond.',
    photoUrl: 'https://picsum.photos/200/200?random=12',
    role: 'Founder'
  },
  {
    id: 't2',
    name: 'Robert "Bob" Lee',
    bio: 'Senior Editor with 20 years of experience in polishing diamonds in the rough.',
    photoUrl: 'https://picsum.photos/200/200?random=13',
    role: 'Team Member'
  }
];

export const PACKAGES: ServicePackage[] = [
  {
    id: 'p1',
    title: 'Seedling Package',
    price: '$999',
    features: ['Professional Editing', 'Cover Design', 'E-book Formatting', 'Social Media Shoutout']
  },
  {
    id: 'p2',
    title: 'Bloom Package',
    price: '$2,499',
    features: ['Everything in Seedling', 'Print Formatting', 'ISBN Registration', 'Author Website Setup', '50 Printed Copies'],
    isPopular: true
  },
  {
    id: 'p3',
    title: 'Legacy Package',
    price: '$4,999',
    features: ['Full Marketing Campaign', 'Book Tour Setup (Texas)', 'Hardcover Edition', 'Video Interview', '1-on-1 Coaching']
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test1',
    name: 'Emily Clark',
    role: 'First-time Author',
    text: 'T & R Birthing Books made my dream a reality. The team in Lubbock felt like family.',
    rating: 5
  },
  {
    id: 'test2',
    name: 'James O\'Connell',
    role: 'Poet',
    text: 'Professional, timely, and they truly understand the art of publishing.',
    rating: 5
  },
  {
    id: 'test3',
    name: 'Maria Rodriguez',
    role: 'Biographer',
    text: 'The Bloom package was exactly what I needed to get my grandmother\'s story out there.',
    rating: 4
  }
];

export const INTERVIEWS: Interview[] = [
  {
    id: 'i1',
    title: 'The Future of Fiction in Texas',
    interviewee: 'Sarah Jenkins',
    thumbnailUrl: 'https://picsum.photos/400/250?random=20',
    videoUrl: '#',
    date: 'Oct 12, 2023'
  },
  {
    id: 'i2',
    title: 'From Manuscript to Bestseller',
    interviewee: 'Tamara Richardson',
    thumbnailUrl: 'https://picsum.photos/400/250?random=21',
    videoUrl: '#',
    date: 'Nov 05, 2023'
  }
];