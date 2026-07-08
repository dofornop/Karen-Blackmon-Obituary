"use client";

import { useEffect, useState } from "react";

function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export default function Guestbook() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    loadComments();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setComments((prev) => [data.comment, ...prev]);
      setName("");
      setMessage("");
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl text-accent mb-3">Guestbook</h1>
        <p className="text-muted">
          Share a memory of Karen or a message for her family.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-surface border border-border rounded-2xl p-6 sm:p-8 space-y-4 mb-12 shadow-sm"
      >
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Your name
          </label>
          <input
            id="name"
            type="text"
            required
            maxLength={80}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-border px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            required
            maxLength={2000}
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full rounded-lg border border-border px-3 py-2 bg-background focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-accent text-white py-2.5 font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {submitting ? "Posting…" : "Post message"}
        </button>
      </form>

      <div className="space-y-4">
        {loading ? (
          <p className="text-center text-muted">Loading messages…</p>
        ) : comments.length === 0 ? (
          <p className="text-center text-muted">
            Be the first to leave a message.
          </p>
        ) : (
          comments.map((c) => (
            <div
              key={c.id}
              className="bg-surface border border-border rounded-xl p-5"
            >
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-medium">{c.name}</span>
                <span className="text-xs text-muted">
                  {formatDate(c.createdAt)}
                </span>
              </div>
              <p className="text-[0.95rem] leading-relaxed whitespace-pre-wrap">
                {c.message}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
