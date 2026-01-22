'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSignup = async () => {
    setLoading(true);

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    setLoading(false);

    if (res.ok) {
      router.push('/login');
    } else {
      const data = await res.json();
      alert(data.message || 'Signup failed');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Create your account</h2>

        <input
          style={styles.input}
          placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          style={styles.input}
          placeholder="Email"
          type="email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button style={styles.primaryBtn} onClick={handleSignup} disabled={loading}>
          {loading ? 'Creating account...' : 'Signup'}
        </button>

        <div style={styles.divider}>OR</div>

        <button
          style={styles.googleBtn}
          onClick={() => signIn('google', { callbackUrl: '/dashboard' })}
        >
          Continue with Google
        </button>

        <p style={styles.footer}>
          Already have an account?{' '}
          <span style={styles.link} onClick={() => router.push('/login')}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

const styles: any = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f4f6f8',
  },
  card: {
    width: 380,
    padding: 30,
    borderRadius: 10,
    background: '#fff',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
  },
  heading: {
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 12,
    borderRadius: 6,
    border: '1px solid #ddd',
  },
  primaryBtn: {
    width: '100%',
    padding: 12,
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
  },
  divider: {
    textAlign: 'center',
    margin: '15px 0',
    color: '#888',
  },
  googleBtn: {
    width: '100%',
    padding: 12,
    background: '#fff',
    border: '1px solid #ddd',
    borderRadius: 6,
    cursor: 'pointer',
  },
  footer: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
  },
  link: {
    color: '#2563eb',
    cursor: 'pointer',
    fontWeight: 500,
  },
};
