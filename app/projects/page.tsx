// 'use client';

// import { useState, useEffect } from 'react';
// import { useSession } from 'next-auth/react';


// interface Project {
//   id: string;
//   name: string;
//   projectKey: string;
//   createdAt: string;
// }

// export default function ProjectsPage() {
//   const [projects, setProjects] = useState<Project[]>([]);
//   const [name, setName] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [toast, setToast] = useState<string | null>(null);

//   // Load projects
//   useEffect(() => {
//     const loadProjects = async () => {
//       setLoading(true);
//       try {
//         const res = await fetch('/api/projects');
//         const data = await res.json();
//         setProjects(data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadProjects();
//   }, []);

//   // Create project
//   const createProject = async () => {
//     if (!name.trim()) return alert('Enter project name');

//     try {
//       const res = await fetch('/api/projects', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name }),
//       });

//       const newProject = await res.json();

//       if (!res.ok) {
//         console.error('Failed to create project', newProject);
//         alert('Failed to create project');
//         return;
//       }

//       setProjects(prev => [newProject, ...prev]);
//       setName('');
//       showToast('✅ Project created successfully!');
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const showToast = (message: string) => {
//     setToast(message);
//     setTimeout(() => setToast(null), 3000);
//   };

//   return (
//     <div style={styles.page}>
//       {/* Toast */}
//       {toast && <div style={styles.toast}>{toast}</div>}

//       <h1 style={{ ...styles.heading, color: '#000308' }}>
//   📊 Projects
// </h1>
//       <p style={styles.subHeading}>Create and manage your projects</p>

//       {/* Create Project */}
//      <div style={styles.createBox}>
//   <input
//     style={{
//       ...styles.input,
//       color: '#020617',        // ✅ text you type (dark)
//       caretColor: '#2563eb',   // ✅ cursor color
//     }}
//     placeholder="Enter project name"
//     value={name}
//     onChange={e => setName(e.target.value)}
//   />
//   <button style={styles.button} onClick={createProject}>
//     Create Project
//   </button>
// </div>


//       {/* Projects */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : projects.length === 0 ? (
//         <p>No projects yet</p>
//       ) : (
//         <div style={styles.grid}>
//           {projects.map(p => (
//             <div key={p.id} style={styles.card}>
//               <h3 style={styles.cardTitle}>{p.name}</h3>
//               <p><strong>ID:</strong> {p.id}</p>
//               <p><strong>Project Key:</strong></p>
//               <code style={styles.code}>{p.projectKey}</code>

//               <p style={{ marginTop: 10 }}><strong>Embed Widget:</strong></p>
//               <pre style={styles.embed}>
// {`<script
//   src="https://yourdomain.com/widget.js"
//   data-project-key="${p.projectKey}">
// </script>`}
//               </pre>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// /* ---------- Styles ---------- */

// const styles: { [key: string]: React.CSSProperties } = {
//   page: {
//     padding: '40px',
//     backgroundColor: '#f4f5f7',
//     minHeight: '100vh',
//     fontFamily: 'Inter, Arial, sans-serif',
//   },
//   heading: { fontSize: 32, marginBottom: 5 },
//   subHeading: { color: '#666', marginBottom: 25 },

//   createBox: {
//     display: 'flex',
//     gap: 12,
//     marginBottom: 30,
//   },
//   input: {
//     flex: 1,
//     padding: '12px',
//     fontSize: 16,
//     borderRadius: 8,
//     border: '1px solid #0a0a0a',
//   },
//   button: {
//     padding: '12px 18px',
//     fontSize: 16,
//     borderRadius: 8,
//     border: 'none',
//     backgroundColor: '#2563eb',
//     color: '#0f0101',
//     cursor: 'pointer',
//   },

//   grid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
//     gap: 20,
//   },
//   card: {
//     backgroundColor: '#f17d7d',
//     padding: 20,
//     borderRadius: 12,
//     boxShadow: '0 6px 14px rgba(0,0,0,0.08)',
//   },
//   cardTitle: { fontSize: 20, marginBottom: 10 },

//   code: {
//     display: 'block',
//     background: '#157fe9',
//     padding: 8,
//     borderRadius: 6,
//     wordBreak: 'break-all',
//   },
//   embed: {
//     background: '#0f172a',
//     color: '#22c55e',
//     padding: 12,
//     borderRadius: 8,
//     fontSize: 12,
//     overflowX: 'auto',
//   },

//   toast: {
//     position: 'fixed',
//     top: 20,
//     right: 20,
//     backgroundColor: '#22c55e',
//     color: '#111010',
//     padding: '12px 18px',
//     borderRadius: 8,
//     boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
//     zIndex: 1000,
//   },
// };


'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';

interface Project {
  id: string;
  name: string;
  projectKey: string;
  createdAt: string;
}

export default function ProjectsPage() {
  const { data: session } = useSession();

  const [projects, setProjects] = useState<Project[]>([]);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<string | null>(null);

  // Load projects
  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProjects();
  }, []);

  // Create project
  const createProject = async () => {
    if (!name.trim()) return alert('Enter project name');

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      const newProject = await res.json();

      if (!res.ok) {
        alert('Failed to create project');
        return;
      }

      setProjects(prev => [newProject, ...prev]);
      setName('');
      showToast('✅ Project created successfully!');
    } catch (err) {
      console.error(err);
    }
  };

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div style={styles.page}>
      {/* Toast */}
      {toast && <div style={styles.toast}>{toast}</div>}

      {/* Heading */}
   <h1 style={{ ...styles.heading, color: '#000308' }}>
  📊 Projects
</h1>

<p style={styles.userText}>
  👋 Welcome, <strong>{session?.user?.name || "Yash"}</strong>
</p>

      {/* Logged-in user */}
      {session?.user && (
        <p style={styles.userText}>
          👋 Welcome, <strong>{session.user.name || session.user.email}</strong>
        </p>
      )}

      <p style={styles.subHeading}>Create and manage your projects</p>

      {/* Create Project */}
      <div style={styles.createBox}>
        <input
          style={{
            ...styles.input,
            color: '#020617',
            caretColor: '#2563eb',
          }}
          placeholder="Enter project name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <button style={styles.button} onClick={createProject}>
          Create Project
        </button>
      </div>

      {/* Projects */}
      {loading ? (
        <p>Loading...</p>
      ) : projects.length === 0 ? (
        <p>No projects yet</p>
      ) : (
        <div style={styles.grid}>
          {projects.map(p => (
            <div key={p.id} style={styles.card}>
              <h3 style={styles.cardTitle}>{p.name}</h3>
              <p><strong>ID:</strong> {p.id}</p>

              <p><strong>Project Key:</strong></p>
              <code style={styles.code}>{p.projectKey}</code>

              <p style={{ marginTop: 10 }}><strong>Embed Widget:</strong></p>
              <pre style={styles.embed}>
{`<script
  src="https://yourdomain.com/widget.js"
  data-project-key="${p.projectKey}">
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
    padding: '40px',
    backgroundColor: '#f4f5f7',
    minHeight: '100vh',
    fontFamily: 'Inter, Arial, sans-serif',
  },
  heading: { fontSize: 32, marginBottom: 5 },
  subHeading: { color: '#666', marginBottom: 25 },

  userText: {
    color: '#2563eb',
    fontSize: 16,
    marginBottom: 10,
  },

  createBox: {
    display: 'flex',
    gap: 12,
    marginBottom: 30,
  },
  input: {
    flex: 1,
    padding: '12px',
    fontSize: 16,
    borderRadius: 8,
    border: '1px solid #0a0a0a',
  },
  button: {
    padding: '12px 18px',
    fontSize: 16,
    borderRadius: 8,
    border: 'none',
    backgroundColor: '#2563eb',
    color: '#ffffff',
    cursor: 'pointer',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    boxShadow: '0 6px 14px rgba(0,0,0,0.08)',
  },
  cardTitle: { fontSize: 20, marginBottom: 10 },

  code: {
    display: 'block',
    background: '#e5e7eb',
    padding: 8,
    borderRadius: 6,
    wordBreak: 'break-all',
  },
  embed: {
    background: '#0f172a',
    color: '#22c55e',
    padding: 12,
    borderRadius: 8,
    fontSize: 12,
    overflowX: 'auto',
  },

  toast: {
    position: 'fixed',
    top: 20,
    right: 20,
    backgroundColor: '#22c55e',
    color: '#111',
    padding: '12px 18px',
    borderRadius: 8,
    boxShadow: '0 6px 16px rgba(0,0,0,0.2)',
    zIndex: 1000,
  },
};
