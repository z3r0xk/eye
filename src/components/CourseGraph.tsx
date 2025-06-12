import { useCallback, useMemo, useEffect } from 'react';
import ReactFlow, {
  Node,
  Edge,
  Background,
  Controls,
  NodeTypes,
  useNodesState,
  useEdgesState,
  Panel,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { Course } from '@/types/course';
import { loadCourses, loadBTechCourses } from '@/utils/courseLoader';
import CourseNode from './CourseNode';
import dagre from '@dagrejs/dagre';
import { useParams } from 'next/navigation';

const nodeTypes: NodeTypes = {
  courseNode: CourseNode,
};

// Path types for different highlighting states
type PathType = 'prerequisite' | 'dependent' | 'none';

interface NodeState {
  pathType: PathType;
  level: number;
}

class PathManager {
  private courseMap: Map<string, Course>;
  private nodeStates: Map<string, NodeState>;
  private selectedCourseId: string | null;

  constructor(courses: Course[]) {
    this.courseMap = new Map(courses.map(course => [course.id, course]));
    this.nodeStates = new Map();
    this.selectedCourseId = null;
  }

  reset() {
    this.nodeStates.clear();
    this.selectedCourseId = null;
  }

  selectCourse(courseId: string) {
    this.reset();
    this.selectedCourseId = courseId;

    // Mark the selected course
    this.nodeStates.set(courseId, { pathType: 'prerequisite', level: 0 });
    
    // Find and mark all prerequisites recursively
    this.findPrerequisites(courseId);
    
    // Find and mark all dependents recursively
    this.findDependents(courseId);
  }

  private findPrerequisites(courseId: string) {
    const course = this.courseMap.get(courseId);
    if (!course) return;

    for (const prereqId of course.prerequisites) {
      if (!this.nodeStates.has(prereqId)) {
        this.nodeStates.set(prereqId, { pathType: 'prerequisite', level: 0 });
        // Continue finding prerequisites even for foundation courses
        this.findPrerequisites(prereqId);
      }
    }
  }

  private findDependents(courseId: string) {
    for (const [id, course] of this.courseMap.entries()) {
      if (course.prerequisites.includes(courseId) && !this.nodeStates.has(id)) {
        // Only mark dependents that have prerequisites (non-foundation courses)
        if (course.prerequisites.length > 0) {
          this.nodeStates.set(id, { pathType: 'dependent', level: 0 });
          this.findDependents(id);
        }
      }
    }
  }

  getNodeState(courseId: string): NodeState {
    return this.nodeStates.get(courseId) || { pathType: 'none', level: -1 };
  }

  isEdgeHighlighted(sourceId: string, targetId: string): boolean {
    const sourceState = this.nodeStates.get(sourceId);
    const targetState = this.nodeStates.get(targetId);

    if (!sourceState || !targetState) return false;

    // Both nodes are prerequisites
    if (sourceState.pathType === 'prerequisite' && targetState.pathType === 'prerequisite') {
      return true;
    }

    // Both nodes are dependents
    if (sourceState.pathType === 'dependent' && targetState.pathType === 'dependent') {
      return true;
    }

    // Connection to selected node
    if (targetId === this.selectedCourseId || sourceId === this.selectedCourseId) {
      return true;
    }

    // Other edges in the path
    return sourceState.pathType !== 'none' && targetState.pathType !== 'none';
  }

  getEdgeStyle(sourceId: string, targetId: string) {
    const sourceState = this.nodeStates.get(sourceId);
    const targetState = this.nodeStates.get(targetId);
    
    if (!this.selectedCourseId) {
      return {
        stroke: '#cbd5e1',
        strokeWidth: 1,
        opacity: 1,
      };
    }

    if (!sourceState || !targetState) {
      return {
        stroke: '#cbd5e1',
        strokeWidth: 1,
        opacity: 0.2,
      };
    }

    // Both nodes are prerequisites
    if (sourceState.pathType === 'prerequisite' && targetState.pathType === 'prerequisite') {
      return {
        stroke: '#f59e0b',
        strokeWidth: 3,
        opacity: 1,
      };
    }

    // Both nodes are dependents
    if (sourceState.pathType === 'dependent' && targetState.pathType === 'dependent') {
      return {
        stroke: '#8b5cf6',
        strokeWidth: 3,
        opacity: 1,
      };
    }

    // Connection to selected node
    if (targetId === this.selectedCourseId || sourceId === this.selectedCourseId) {
      return {
        stroke: '#6366f1',
        strokeWidth: 3,
        opacity: 1,
      };
    }

    // Other edges in the path
    if (sourceState.pathType !== 'none' && targetState.pathType !== 'none') {
      return {
        stroke: '#6366f1',
        strokeWidth: 2,
        opacity: 0.7,
      };
    }

    // Unrelated edges
    return {
      stroke: '#cbd5e1',
      strokeWidth: 1,
      opacity: 0.2,
    };
  }

  getHighlightedCount(): number {
    return this.nodeStates.size;
  }
}

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
  const g = new dagre.graphlib.Graph();
  g.setGraph({ rankdir: 'TB', nodesep: 80, ranksep: 100 });
  g.setDefaultEdgeLabel(() => ({}));

  nodes.forEach((node) => {
    g.setNode(node.id, { width: 250, height: 100 });
  });

  edges.forEach((edge) => {
    g.setEdge(edge.source, edge.target);
  });

  dagre.layout(g);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPosition = g.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - 125,
        y: nodeWithPosition.y - 50,
      },
    };
  });

  return { nodes: layoutedNodes, edges };
};

interface CourseGraphProps {
  courses: Course[];
  selectedCourseId: string | null;
  onCourseSelect: (courseId: string | null) => void;
  onInfoClick: (courseId: string) => void;
  searchQuery: string;
}

export default function CourseGraph({ courses, selectedCourseId, onCourseSelect, onInfoClick, searchQuery }: CourseGraphProps) {
  const params = useParams();
  const program = params?.program as string;

  // Load courses based on program
  const allCourses = useMemo(() => {
    return program === 'diploma' ? loadCourses() : loadBTechCourses();
  }, [program]);
  
  // Include courses that either have prerequisites or are used as prerequisites
  const coursesToUse = useMemo(() => {
    const prerequisiteIds = new Set<string>();
    courses.forEach(course => {
      course.prerequisites.forEach(prereqId => {
        prerequisiteIds.add(prereqId);
      });
    });

    return courses.filter(course => 
      course.prerequisites.length > 0 || prerequisiteIds.has(course.id)
    );
  }, [courses]);
  
  const pathManager = useMemo(() => new PathManager(courses), [courses]);

  // Filter matching courses based on search query
  const matchingCourseIds = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    return new Set(
      coursesToUse
        .filter(
          (course) =>
            !searchQuery ||
            course.code.toLowerCase().includes(lowerQuery) ||
            course.name.toLowerCase().includes(lowerQuery)
        )
        .map(course => course.id)
    );
  }, [coursesToUse, searchQuery]);

  // Update nodes and edges when selection changes
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    if (selectedCourseId) {
      pathManager.selectCourse(selectedCourseId);
    } else {
      pathManager.reset();
    }

    const nodes: Node[] = coursesToUse.map((course) => {
      const state = pathManager.getNodeState(course.id);
      const isHighlighted = !searchQuery || matchingCourseIds.has(course.id);
      return {
        id: course.id,
        type: 'courseNode',
        data: {
          ...course,
          selected: course.id === selectedCourseId,
          isInPath: state.pathType !== 'none',
          pathType: state.pathType,
          isHighlighted,
          onInfoClick: () => onInfoClick(course.id)
        },
        position: { x: 0, y: 0 },
        style: {
          opacity: isHighlighted ? 1 : 0.3,
          transition: 'opacity 0.2s ease-in-out',
        },
      };
    });

    const edges: Edge[] = coursesToUse.flatMap((course) =>
      course.prerequisites
        .filter((prereqId) => 
          // Include edges to prerequisites even if they're foundation courses
          courses.some((c) => c.id === prereqId)
        )
        .map((prereqId) => {
          const isHighlighted = !searchQuery || (matchingCourseIds.has(prereqId) && matchingCourseIds.has(course.id));
          return {
            id: `${prereqId}-${course.id}`,
            source: prereqId,
            target: course.id,
            type: 'smoothstep',
            animated: pathManager.isEdgeHighlighted(prereqId, course.id),
            style: {
              ...pathManager.getEdgeStyle(prereqId, course.id),
              opacity: isHighlighted ? 1 : 0.1,
              transition: 'opacity 0.2s ease-in-out',
            },
          };
        })
    );

    return getLayoutedElements(nodes, edges);
  }, [coursesToUse, selectedCourseId, pathManager, allCourses, onInfoClick, searchQuery, matchingCourseIds]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Update nodes and edges when they change
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    event.stopPropagation();
    const newSelectedId = node.id === selectedCourseId ? null : node.id;
    onCourseSelect?.(newSelectedId);
  }, [selectedCourseId, onCourseSelect]);

  const onPaneClick = useCallback(() => {
    onCourseSelect?.(null);
  }, [onCourseSelect]);

  return (
    <div className="flex-1 h-full bg-slate-900/50 rounded-lg overflow-hidden backdrop-blur-sm">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.1}
        maxZoom={1.5}
        defaultEdgeOptions={{
          type: 'smoothstep',
        }}
        className="bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800/50 via-slate-900/50 to-slate-950/50"
      >
        <Background color="#475569" gap={24} size={2} />
        <Controls className="bg-slate-800 border-slate-700 shadow-xl fill-slate-200" />
        <MiniMap
          nodeColor={(node) => {
            const state = pathManager.getNodeState(node.id);
            switch (state.pathType) {
              case 'prerequisite':
                return '#f59e0b'; // Amber
              case 'dependent':
                return '#8b5cf6'; // Violet
              default:
                return node.id === selectedCourseId ? '#6366f1' : '#475569'; // Indigo : Slate
            }
          }}
          className="bg-slate-800/80 border-slate-700 shadow-xl"
          maskColor="#0f172a"
        />
        <Panel position="bottom-center" className="bg-slate-800/80 backdrop-blur-sm p-2 rounded-t-lg border border-slate-700 shadow-xl">
          <div className="text-sm text-slate-300">
            {searchQuery && matchingCourseIds.size > 0 && `${matchingCourseIds.size} matching course${matchingCourseIds.size !== 1 ? 's' : ''} • `}
            {coursesToUse.length} course{coursesToUse.length !== 1 ? 's' : ''} total
            {selectedCourseId && ` • ${pathManager.getHighlightedCount()} related courses`}
          </div>
        </Panel>
      </ReactFlow>
    </div>
  );
} 