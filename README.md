# 👁️ Eyes - Course Prerequisites Visualization

A modern, interactive web application for visualizing course prerequisites and academic pathways. Built with Next.js and React Flow, Eyes helps students and advisors navigate complex course relationships with an intuitive mindmap interface.

## 🚀 Features

- **Interactive Course Mindmap**
  - Visual representation of course prerequisites and dependencies
  - Smooth animations and transitions
  - Intuitive drag-and-drop interface
  - Real-time course relationship highlighting

- **Smart Search**
  - Instant course search with visual highlighting
  - Maintains context by dimming non-matching courses
  - Search by course code or name
  - Real-time results updating

- **Program-Specific Views**
  - Support for multiple academic programs (Diploma/BTech)
  - Program-specific course relationships
  - Customized course information display

- **Modern UI/UX**
  - Responsive design for all screen sizes
  - Dark mode optimized interface
  - Smooth transitions and animations
  - Accessible keyboard navigation

## 🛠️ Technology Stack

### Frontend
- **Framework**: [Next.js 15.3](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **UI Components**: 
  - [React Flow](https://reactflow.dev/) for interactive graphs
  - [Tailwind CSS](https://tailwindcss.com/) for styling
  - [Heroicons](https://heroicons.com/) for icons
- **Build Tool**: [Turbopack](https://turbo.build/pack) for fast development

### Development Tools
- **Package Manager**: npm
- **Version Control**: Git
- **Code Quality**:
  - ESLint for code linting
  - Prettier for code formatting
  - TypeScript for type safety

## 🏗️ Architecture

### Component Structure
```
src/
├── app/                    # Next.js app directory
│   ├── [program]/         # Dynamic program routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── CourseGraph.tsx    # Main graph visualization
│   ├── CourseNode.tsx     # Individual course nodes
│   ├── InfoButton.tsx     # Course information button
│   └── ...
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
└── data/                 # Course data and configurations
```

### Key Features Implementation

#### Course Graph Visualization
- Uses React Flow for interactive graph rendering
- Custom node components for course representation
- Edge styling for prerequisite relationships
- Automatic layout calculation for optimal viewing

#### Search and Highlighting
- Real-time search with visual feedback
- Opacity-based highlighting system
- Maintains graph context during search
- Smooth transitions between states

#### State Management
- React hooks for local state
- Custom path manager for course relationships
- Efficient course data structures
- Reactive updates for UI components

## 🚦 Getting Started

### Prerequisites
- Node.js 18.0 or higher
- npm 9.0 or higher

### Installation
```bash
# Clone the repository
git clone https://github.com/z3r0xk/eye.git

# Navigate to project directory
cd eye

# Install dependencies
npm install

# Start development server
npm run dev
```

### Development Commands
```bash
npm run dev      # Start development server
npm run build    # Create production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🎯 Usage

1. **Select Program**
   - Choose between Diploma or BTech programs
   - View program-specific course relationships

2. **Navigate Courses**
   - Drag to pan the view
   - Scroll to zoom in/out
   - Click courses to see relationships

3. **Search Functionality**
   - Type in the search bar to find courses
   - Matching courses are highlighted
   - Non-matching courses are dimmed

4. **Course Information**
   - Click info button for detailed course info
   - View prerequisites and credit hours
   - See related courses

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React Flow team for the excellent graph visualization library
- Next.js team for the amazing framework
- All contributors and testers

---
Built with ❤️ by [z3r0xk](https://github.com/z3r0xk)
