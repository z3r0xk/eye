import { Course } from '@/types/course';
import diplomaCourses from '@/data/diploma-courses.json';
import btechCourses from '@/data/btech-courses.json';

export const loadCourses = (): Course[] => {
  return diplomaCourses.courses;
};

export const loadBTechCourses = (): Course[] => {
  return btechCourses.courses;
}; 