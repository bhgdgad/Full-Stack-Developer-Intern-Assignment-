'use client';

import { useEffect, useState } from 'react';

interface Project {
  id: string;
  name: string;
  projectKey: string;
}

export default function Dashboard() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  // Load projects ONLY
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error('Error loading projects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>📊 Dashboard</h1>
      <p style={styles.subHeading}>Your created projects</p>

      {loading ? (
        <p style={styles.loading}>Loading projects...</p>
      ) : projects.length === 0 ? (
        <p style={styles.empty}>No projects found</p>
      ) : (
        <div style={styles.grid}>
          {projects.map(project => (
            <div key={project.id} style={styles.card}>
              <h3 style={styles.projectName}>{project.name}</h3>

              <p style={styles.projectKey}>
                <strong>Project Key:</strong> {project.projectKey}
              </p>

              <pre style={styles.code}>
{`<script
  src="https://feedbackpulse.com/widget.js"
  data-project-key="${project.projectKey}">
</script>`}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Styles ---------- */
const styles: { [key: string]: React.CSSProperties } = {
  page: {
    padding: '30px',
    backgroundColor: '#f4f6f8',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '32px',
    marginBottom: '5px',
  },
  subHeading: {
    color: '#555',
    marginBottom: '25px',
  },
  loading: {
    fontSize: '18px',
    color: '#666',
  },
  empty: {
    fontSize: '18px',
    color: '#999',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.08)',
  },
  projectName: {
    fontSize: '20px',
    marginBottom: '10px',
  },
  projectKey: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '15px',
    wordBreak: 'break-all',
  },
  code: {
    background: '#111',
    color: '#0f0',
    padding: 10,
    borderRadius: 4,
    fontSize: 12,
    overflowX: 'auto',
  },
};
