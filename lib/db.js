import path from "node:path";

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL;

let impl;

if (connectionString) {
  // Production / any environment with a Neon (or other Postgres) connection string.
  const { neon } = await import("@neondatabase/serverless");
  const sql = neon(connectionString);

  await sql`
    CREATE TABLE IF NOT EXISTS comments (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  impl = {
    async listComments() {
      return sql`SELECT id, name, message, created_at AS "createdAt" FROM comments ORDER BY created_at DESC`;
    },
    async addComment(name, message) {
      const rows = await sql`
        INSERT INTO comments (name, message) VALUES (${name}, ${message})
        RETURNING id, name, message, created_at AS "createdAt"
      `;
      return rows[0];
    },
    async deleteComment(id) {
      await sql`DELETE FROM comments WHERE id = ${id}`;
    },
  };
} else {
  // Local development fallback: a file-backed SQLite database via Node's
  // built-in node:sqlite, so the guestbook works with zero external setup.
  const { DatabaseSync } = await import("node:sqlite");
  const dbPath = path.join(process.cwd(), ".local-data", "guestbook.db");
  await import("node:fs").then((fs) =>
    fs.mkdirSync(path.dirname(dbPath), { recursive: true })
  );
  const db = new DatabaseSync(dbPath);

  db.exec(`
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    )
  `);

  impl = {
    async listComments() {
      const rows = db
        .prepare(
          "SELECT id, name, message, created_at AS createdAt FROM comments ORDER BY created_at DESC"
        )
        .all();
      return rows;
    },
    async addComment(name, message) {
      const { lastInsertRowid } = db
        .prepare("INSERT INTO comments (name, message) VALUES (?, ?)")
        .run(name, message);
      return db
        .prepare(
          "SELECT id, name, message, created_at AS createdAt FROM comments WHERE id = ?"
        )
        .get(lastInsertRowid);
    },
    async deleteComment(id) {
      db.prepare("DELETE FROM comments WHERE id = ?").run(id);
    },
  };
}

export const { listComments, addComment, deleteComment } = impl;
