import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ProjectDetail from './ProjectDetail';
import { PROJECTS } from '../constants';
import { Project } from '../types';

const ProjectDetailWrapper: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  
  const [project, setProject] = useState<Project | null>((location.state?.project as Project) || null);
  const [loading, setLoading] = useState(!location.state?.project);

  useEffect(() => {
    if (project) return;

    // Look up from static PROJECTS list only
    const staticProject = PROJECTS.find(p => p.id === id);
    if (staticProject) {
      setProject(staticProject);
    }
    setLoading(false);
  }, [id, project]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-dark text-slate-900 dark:text-white">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-dark text-slate-900 dark:text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Project Not Found</h2>
          <button onClick={() => navigate('/')} className="text-primary hover:underline">Return Home</button>
        </div>
      </div>
    );
  }

  return <ProjectDetail project={project} onBack={() => navigate('/')} />;
};

export default ProjectDetailWrapper;
