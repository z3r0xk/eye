import { Course } from '@/types/course';

const diplomaCourses: Course[] = [
  {
    id: 'math101',
    code: 'MATH101',
    name: 'Basic Mathematics',
    hours: { creditHours: 3, lectureHours: 3, labHours: 0 },
    prerequisites: [],
  },
  {
    id: 'cs101',
    code: 'CS101',
    name: 'Introduction to Programming',
    hours: { creditHours: 4, lectureHours: 3, labHours: 2 },
    prerequisites: ['math101'],
  },
  {
    id: 'cs102',
    code: 'CS102',
    name: 'Data Structures',
    hours: { creditHours: 4, lectureHours: 3, labHours: 2 },
    prerequisites: ['cs101'],
  },
];

const btechCourses: Course[] = [
  {
    id: 'math201',
    code: 'MATH201',
    name: 'Advanced Mathematics',
    hours: { creditHours: 3, lectureHours: 3, labHours: 0 },
    prerequisites: [],
  },
  {
    id: 'cs201',
    code: 'CS201',
    name: 'Object-Oriented Programming',
    hours: { creditHours: 4, lectureHours: 3, labHours: 2 },
    prerequisites: ['math201'],
  },
  {
    id: 'cs202',
    code: 'CS202',
    name: 'Algorithms',
    hours: { creditHours: 4, lectureHours: 3, labHours: 2 },
    prerequisites: ['cs201'],
  },
];

export const getDiplomaCourses = (): Course[] => diplomaCourses;
export const getBTechCourses = (): Course[] => btechCourses; 