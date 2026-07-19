import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { Project } from '../types';
import ProjectDetail from './ProjectDetail';

const ProjectDetailWrapper: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>((location.state?.project as Project) || null);
  const [loading, setLoading] = useState(!location.state?.project);

  useEffect(() => {
    if (project) return;
    setProject(PROJECTS.find((candidate) => candidate.id === id) || null);
    setLoading(false);
  }, [id, project]);

  if (loading) {
    return (
      <main className="route-state" aria-label="Loading project">
        <div className="route-state__skeleton">
          <span />
          <span />
          <span />
        </div>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="route-state">
        <div>
          <h1>Project not found.</h1>
          <p>The project may have moved or the link is incomplete.</p>
          <button type="button" className="button button--primary" onClick={() => navigate('/')}>
            Return home
          </button>
        </div>
      </main>
    );
  }

  return <ProjectDetail project={project} onBack={() => navigate('/#work')} />;
};

export default ProjectDetailWrapper;
