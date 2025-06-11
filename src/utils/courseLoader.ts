import { Course, CourseData } from '@/types/course';
import courseData from '@/data/courses.json';

export function loadCourses(): Course[] {
  return (courseData as CourseData).courses;
} 