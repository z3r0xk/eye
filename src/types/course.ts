export interface Course {
  id: string;
  code: string;
  name: string;
  prerequisites: string[];
  creditHours: number;
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