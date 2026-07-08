"use client";

import { useEffect, useState } from "react";

export default function Admin() {
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin-password");
    if (saved) {
      setPassword(saved);
      setUnlocked(true);
    }
  }, []);

  useEffect(() => {
    if (unlocked) loadComments();
  }, [unlocked]);

  async function loadComments() {
    setLoading(true);
    try {
      const res = await fetch("/api/comments");
      const data = await res.json();
      setComments(data.comments || []);
    } finally {
      setLoading(false);
    }
  }

  function handleUnlock(e) {
    e.preventDefault();
    sessionStorage.setItem("admin-password", password);
    setUnlocked(true);
  }

  async function handleDelete(id) {
    setError(null);
    const res = await fetch(`/api/admin/comments/${id}`, {
      method: "DELETE",
      headers: { "x-admin-password": password },
    });
    if (res.status === 401) {
      setError("Incorrect password.");
      sessionStorage.removeItem("admin-password");
      setUnlocked(false);
      return;
    }
    if (!res.ok) {
      setError("Could not delete that message.");
      return;
    }
    setComments((prev) => prev.filter((c) => c.id !== id));
  }

  if (!unlocked) {
    return (
      <div className="max-w-sm mx-auto px-6 py-24">
        <h1 className="font-serif text-2xl text-accent mb-6 text-center">
          Admin
        </h1>
        <form onSubmit={handleUnlock} className="space-y-3">
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-border px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-accent"
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-accent text-white py-2.5 font-medium hover:opacity-90 transition-opacity"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <h1 className="font-serif text-3xl text-accent mb-8 text-center">
        Manage Guestbook
      </h1>
      {error && <p className="text-sm text-red-600 mb-4 text-center">{error}</p>}
      {loading ? (
        <p className="text-center text-muted">Loading…</p>
      ) : comments.length === 0 ? (
        <p className="text-center text-muted">No messages yet.</p>
      ) : (
        <div className="space-y-3">
          {comments.map((c) => (
            <div
              key={c.id}
              className="bg-surface border border-border rounded-xl p-4 flex items-start justify-between gap-4"
            >
              <div>
                <div className="font-medium mb-1">{c.name}</div>
                <p className="text-sm text-muted whitespace-pre-wrap">
                  {c.message}
                </p>
              </div>
              <button
                onClick={() => handleDelete(c.id)}
                className="text-sm text-red-600 hover:underline shrink-0"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
