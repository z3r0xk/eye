import { Course } from '@/types/course';
import coursesData from '@/data/courses.json';

interface CoursesData {
  courses: Course[];
}

export function loadCourses(): Course[] {
  return (coursesData as CoursesData).courses;
} 