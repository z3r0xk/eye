# Course Prerequisites Visualizer

An interactive web application for visualizing course prerequisites and dependencies. Built with Next.js, React Flow, and TypeScript.

## Features

- Interactive course dependency graph visualization
- Real-time search functionality
- Path highlighting for prerequisites and dependent courses
- Responsive design with dark theme
- Course credit hours display

## Tech Stack

- Next.js 14
- React Flow
- TypeScript
- Tailwind CSS

## Getting Started

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Data Structure

Course data is stored in `src/data/courses.json`. Each course has the following structure:

```typescript
interface Course {
  id: string;
  code: string;
  name: string;
  prerequisites: string[];
  creditHours: number;
}
```

## License

MIT
