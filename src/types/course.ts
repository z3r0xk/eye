export interface CourseHours {
  lecture: number;
  tutorial: number;
  lab: number;
  training: number;
  totalContactHours: number;
  creditHours: number;
  studentWorkload: number;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  prerequisites: string[];
  hours: CourseHours;
  description: string;
}

export interface CourseData {
  courses: Course[];
}

export interface CourseNode {
  id: string;
  type: 'courseNode';
  data: Course;
  position: { x: number; y: number };
}

export interface CourseEdge {
  id: string;
  source: string;
  target: string;
} 