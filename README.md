# Kanban Board Application

## Project Overview
The Kanban Board is a dynamic and interactive task management tool built with **React**, **TypeScript**, and **React DnD**. It is designed to organize and prioritize tasks through an intuitive drag-and-drop interface. The board features customizable columns to categorize tasks, allowing users to manage their workflow efficiently.

---

## Features Implemented
1. **Task Management:**
   - Add tasks to specific columns.
   - Search and filter tasks within columns using the search bar.
   - Move tasks within columns or across columns via drag-and-drop.
   - Keyboard accessibility for task navigation and movement.

2. **Column Management:**
   - Add new columns to the board.
   - Move columns left or right via keyboard shortcuts.
   - Delete unwanted columns.

3. **UI/UX Enhancements:**
   - Highlight columns during drag-and-drop for better visual cues.
   - Responsive and user-friendly layout.
   - Animations for smoother interactions using **CSS transitions** and **Framer Motion**.
   - Task and column focus indicators for improved navigation.

4. **Accessibility:**
   - Keyboard shortcuts:
     - Shift + Arrow keys to move columns.
     - Tab navigation for tasks and columns.
   - Focus indicators for better navigation.

5. **Persistence:**
   - Save board state (tasks and columns) locally to ensure persistence across sessions.

---

## Installation and Setup Instructions

### Prerequisites
Ensure you have the following installed:
- **Node.js** (>= 14.0)
- **npm** package manager

### Steps
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd <repository_name>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open the app in your browser:
   ```
   http://localhost:3000
   ```

---

## Technology Choices and Rationale

1. **React with TypeScript:**
   - TypeScript ensures type safety and reduces runtime errors.
   - React's component-based architecture makes the application modular and reusable.

2. **React DnD:**
   - Handles drag-and-drop operations with ease while maintaining the performance of the application.

3. **CSS Modules and Material UI:**
   - CSS Modules ensure encapsulation of styles.
   - Material UI adds built-in styleds UIs to improve app's design and visuals.

4. **Local Storage:**
   - Provides persistence for tasks and columns, enhancing user experience.

---

## Known Limitations and Trade-offs

1. **Task Editing:**
   - Currently, tasks cannot be edited once created.
   
2. **Drag-and-Drop for Columns:**
   - While columns can be moved via keyboard shortcuts, drag-and-drop for columns is yet to be implemented.

3. **Multi-Select Tasks:**
   - There is no functionality to move multiple tasks simultaneously.

4. **Responsive Design:**
   - Basic responsiveness is implemented, but the design could be enhanced for small-screen devices.

---

## Future Improvements

1. **Enhanced Task Functionality:**
   - Allow editing and reordering of tasks within a column.
   - Implement priority tagging for tasks.

2. **Column Drag-and-Drop:**
   - Enable drag-and-drop functionality for columns.

3. **Improved Test Coverage:**
   - Write comprehensive unit and integration tests using **Jest** and **React Testing Library**.

4. **User Authentication:**
   - Add authentication to provide personalized boards for different users.

5. **Dark Mode:**
   - Include a toggle for dark mode to enhance usability in low-light environments.

6. **Real-Time Collaboration:**
   - Integrate WebSocket or a real-time database to allow multiple users to collaborate on the same board.

---

## Live Demo
- A live version of the project can be accessed [here](kanban-board-react-ts.vercel.app) *(Replace with actual link if hosted).*

---
