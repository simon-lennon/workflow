# Workflow Builder

A Vue 3 workflow builder application using Vue Flow, Pinia, and Bootstrap 5.

## Features
- Drag and drop workflow builder
- Different node types (Task, Condition)
- Node connection management
- Visual workflow representation
- Responsive design with Bootstrap 5
- State management with Pinia

## Prerequisites
- Node.js 16+ and npm

## Setup

1. Clone the repository:
```bash
git clone https://github.com/simon-lennon/workflow.git
cd workflow
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Project Structure
- `src/App.vue`: Main application component
- `src/stores/workflow.js`: Pinia store for workflow management
- `src/main.js`: Application entry point

## Technologies Used
- Vue 3 with Composition API
- Pinia for state management
- Vue Flow for workflow visualization
- Bootstrap 5 for UI components
- Vite for build tooling

## Contributing
1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License
MIT