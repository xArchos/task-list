import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import { TasksProvider } from './components/TaskContext';

const Home = lazy(() => import('./components/Home'));
const TaskPage = lazy(() => import('./components/TaskPage'));
const FormPage = lazy(() => import('./components/FormPage'));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <TasksProvider>
      <Router>
        <div className="App">
          <nav>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/tasks">Tasks</Link></li>
              <li><Link to="/form">Form</Link></li>
            </ul>
          </nav>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tasks" element={<TaskPage />} />
              <Route path="/form" element={<FormPage />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </TasksProvider>
  </React.StrictMode>,
);
