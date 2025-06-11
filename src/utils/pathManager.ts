import { Course } from '@/types/course';

type PathType = 'prerequisite' | 'dependent' | 'none';

interface NodeState {
  pathType: PathType;
  isHighlighted: boolean;
}

export class PathManager {
  private courses: Course[];
  courseMap: Map<string, Course>;
  nodeStates: Map<string, NodeState>;
  private selectedCourseId: string | null = null;
  private pathNodes: Set<string> = new Set();
  private prerequisitePaths: Set<string> = new Set();
  private dependentPaths: Set<string> = new Set();

  constructor(courses: Course[]) {
    this.courses = courses;
    this.courseMap = new Map(courses.map(course => [course.id, course]));
    this.nodeStates = new Map();
    this.reset();
  }

  reset() {
    this.selectedCourseId = null;
    this.pathNodes.clear();
    this.prerequisitePaths.clear();
    this.dependentPaths.clear();
    this.nodeStates.clear();
    
    this.courses.forEach(course => {
      this.nodeStates.set(course.id, {
        pathType: 'none',
        isHighlighted: false
      });
    });
  }

  private findPrerequisites(courseId: string, visited: Set<string> = new Set()) {
    if (visited.has(courseId)) return;
    visited.add(courseId);

    const course = this.courseMap.get(courseId);
    if (!course) return;

    course.prerequisites.forEach(prereqId => {
      this.prerequisitePaths.add(prereqId);
      this.pathNodes.add(prereqId);
      this.nodeStates.set(prereqId, {
        pathType: 'prerequisite',
        isHighlighted: true
      });
      this.findPrerequisites(prereqId, visited);
    });
  }

  private findDependents(courseId: string, visited: Set<string> = new Set()) {
    if (visited.has(courseId)) return;
    visited.add(courseId);

    this.courses.forEach(course => {
      if (course.prerequisites.includes(courseId)) {
        this.dependentPaths.add(course.id);
        this.pathNodes.add(course.id);
        this.nodeStates.set(course.id, {
          pathType: 'dependent',
          isHighlighted: true
        });
        this.findDependents(course.id, visited);
      }
    });
  }

  selectCourse(courseId: string | null) {
    this.reset();
    this.selectedCourseId = courseId;

    if (courseId) {
      this.pathNodes.add(courseId);
      this.nodeStates.set(courseId, {
        pathType: 'none',
        isHighlighted: true
      });
      this.findPrerequisites(courseId);
      this.findDependents(courseId);
    }
  }

  getNodeState(courseId: string): NodeState {
    return (
      this.nodeStates.get(courseId) || {
        pathType: 'none',
        isHighlighted: false
      }
    );
  }

  isEdgeHighlighted(sourceId: string, targetId: string): boolean {
    if (!this.selectedCourseId || this.pathNodes.size === 0) {
      return false;
    }

    // Check if this edge is part of the prerequisite path
    if (this.prerequisitePaths.has(sourceId) && this.prerequisitePaths.has(targetId)) {
      return true;
    }

    // Check if this edge is part of the dependent path
    if (this.dependentPaths.has(sourceId) && this.dependentPaths.has(targetId)) {
      return true;
    }

    return false;
  }

  getEdgeStyle(sourceId: string, targetId: string) {
    const isHighlighted = this.isEdgeHighlighted(sourceId, targetId);
    return {
      stroke: isHighlighted ? '#6366f1' : '#475569',
      strokeWidth: isHighlighted ? 2 : 1,
    };
  }

  getHighlightedCount(): number {
    return Array.from(this.nodeStates.values()).filter(state => state.isHighlighted).length;
  }
} 