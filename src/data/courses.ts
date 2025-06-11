import { Course } from '@/types/course';

const diplomaCourses: Course[] = [
  {
    id: 'math101',
    code: 'MATH101',
    name: 'Basic Mathematics',
    description: 'Fundamental mathematical concepts and problem-solving techniques.',
    hours: {
      lecture: 3,
      tutorial: 0,
      lab: 0,
      training: 0,
      totalContactHours: 3,
      creditHours: 3,
      studentWorkload: 9
    },
    prerequisites: [],
  },
  {
    id: 'cs101',
    code: 'CS101',
    name: 'Introduction to Programming',
    description: 'Basic programming concepts using a high-level programming language.',
    hours: {
      lecture: 3,
      tutorial: 0,
      lab: 2,
      training: 0,
      totalContactHours: 5,
      creditHours: 4,
      studentWorkload: 12
    },
    prerequisites: ['math101'],
  },
  {
    id: 'cs102',
    code: 'CS102',
    name: 'Data Structures',
    description: 'Fundamental data structures and their implementation in programming.',
    hours: {
      lecture: 3,
      tutorial: 0,
      lab: 2,
      training: 0,
      totalContactHours: 5,
      creditHours: 4,
      studentWorkload: 12
    },
    prerequisites: ['cs101'],
  },
];

const btechCourses: Course[] = [
  {
    id: 'math201',
    code: 'MATH201',
    name: 'Advanced Mathematics',
    description: 'Advanced mathematical concepts for engineering applications.',
    hours: {
      lecture: 3,
      tutorial: 0,
      lab: 0,
      training: 0,
      totalContactHours: 3,
      creditHours: 3,
      studentWorkload: 9
    },
    prerequisites: [],
  },
  {
    id: 'cs201',
    code: 'CS201',
    name: 'Object-Oriented Programming',
    description: 'Object-oriented programming concepts and design patterns.',
    hours: {
      lecture: 3,
      tutorial: 0,
      lab: 2,
      training: 0,
      totalContactHours: 5,
      creditHours: 4,
      studentWorkload: 12
    },
    prerequisites: ['math201'],
  },
  {
    id: 'cs202',
    code: 'CS202',
    name: 'Algorithms',
    description: 'Design and analysis of algorithms and computational complexity.',
    hours: {
      lecture: 3,
      tutorial: 0,
      lab: 2,
      training: 0,
      totalContactHours: 5,
      creditHours: 4,
      studentWorkload: 12
    },
    prerequisites: ['cs201'],
  },
];

export const getDiplomaCourses = (): Course[] => diplomaCourses;
export const getBTechCourses = (): Course[] => btechCourses; 