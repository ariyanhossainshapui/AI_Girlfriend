const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '..', 'data');
fs.mkdirSync(dataDir, { recursive: true });

const db = new sqlite3.Database(path.join(dataDir, 'otakuverse.sqlite'));

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
}

function all(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
}

async function init() {
  await run(`CREATE TABLE IF NOT EXISTS player (
    id INTEGER PRIMARY KEY,
    username TEXT,
    display_name TEXT,
    bio TEXT,
    avatar TEXT,
    followers INTEGER DEFAULT 0,
    following INTEGER DEFAULT 0,
    likes INTEGER DEFAULT 0,
    popularity INTEGER DEFAULT 1,
    reputation INTEGER DEFAULT 0,
    verified INTEGER DEFAULT 0,
    trending_score INTEGER DEFAULT 0,
    created_at TEXT
  )`);

  await run(`CREATE TABLE IF NOT EXISTS characters (
    id TEXT PRIMARY KEY,
    name TEXT,
    avatar TEXT,
    bio TEXT,
    archetype TEXT,
    personality TEXT,
    interests TEXT,
    followers INTEGER,
    following INTEGER,
    popularity INTEGER,
    mood TEXT,
    posting_style TEXT,
    relationships TEXT,
    memories TEXT,
    active INTEGER DEFAULT 1
  )`);

  await run(`CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    author_id TEXT,
    author_type TEXT,
    text TEXT,
    hashtags TEXT,
    likes INTEGER DEFAULT 0,
    comments INTEGER DEFAULT 0,
    reposts INTEGER DEFAULT 0,
    views INTEGER DEFAULT 0,
    virality REAL DEFAULT 0,
    created_at TEXT
  )`);

  await run(`CREATE TABLE IF NOT EXISTS comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    post_id INTEGER,
    author_id TEXT,
    text TEXT,
    created_at TEXT
  )`);

  await run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    character_id TEXT,
    sender TEXT,
    text TEXT,
    created_at TEXT
  )`);

  await run(`CREATE TABLE IF NOT EXISTS memories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    character_id TEXT,
    memory TEXT,
    importance INTEGER DEFAULT 1,
    created_at TEXT
  )`);

  await run(`CREATE TABLE IF NOT EXISTS notifications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT,
    icon TEXT,
    read INTEGER DEFAULT 0,
    created_at TEXT
  )`);

  await run(`CREATE TABLE IF NOT EXISTS trends (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tag TEXT,
    score INTEGER DEFAULT 0,
    source TEXT,
    created_at TEXT
  )`);

  await run(`CREATE TABLE IF NOT EXISTS achievements (
    id TEXT PRIMARY KEY,
    unlocked INTEGER DEFAULT 0,
    unlocked_at TEXT
  )`);

  await run(`CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    created_at TEXT
  )`);
}

module.exports = { db, run, all, get, init };