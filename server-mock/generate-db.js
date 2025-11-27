const fs = require("fs");
const path = require("path");

const dbFilePath = path.join(__dirname, "db.json");

const getDateOffset = (daysAgo) => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

const bookmarks = [
  {
    id: crypto.randomUUID(),
    updatedAt: getDateOffset(0),
    name: "Angular",
    url: "https://angular.io",
  },
  {
    id: crypto.randomUUID(),
    updatedAt: getDateOffset(1),
    name: "json-server",
    url: "http://localhost:3000/bookmarks",
  },
  {
    id: crypto.randomUUID(),
    updatedAt: getDateOffset(1),
    name: "bookmarks-app",
    url: "http://localhost:4200",
  },
  {
    id: crypto.randomUUID(),
    updatedAt: getDateOffset(3),
    name: "GitHub",
    url: "https://github.com",
  },
  {
    id: crypto.randomUUID(),
    updatedAt: getDateOffset(4),
    name: "Medium",
    url: "https://medium.com",
  },
  {
    id: crypto.randomUUID(),
    updatedAt: getDateOffset(5),
    name: "Google",
    url: "https://google.com",
  },
  {
    id: crypto.randomUUID(),
    updatedAt: getDateOffset(6),
    name: "TypeScript",
    url: "https://www.typescriptlang.org",
  },
  {
    id: crypto.randomUUID(),
    updatedAt: getDateOffset(7),
    name: "Dev.to",
    url: "https://dev.to",
  },
];

const db = { bookmarks };

fs.writeFileSync(dbFilePath, JSON.stringify(db, null, 2));
console.log("db.json generated successfully");
