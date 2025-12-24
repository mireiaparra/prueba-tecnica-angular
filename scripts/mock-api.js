const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({ limit: '5mb' }));

const filePath = path.join(__dirname, '..', 'src', 'assets', 'mock', 'sessions.json');

function readJson() {
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw || '[]');
  } catch (e) {
    return [];
  }
}

function writeJson(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
}

app.get('/api/sessions', (req, res) => {
  const list = readJson();
  res.json(list);
});

app.get('/api/sessions/:id', (req, res) => {
  const list = readJson();
  const item = list.find((s) => s.id === req.params.id);
  if (!item) return res.status(404).json({ error: 'Not found' });
  res.json(item);
});

app.post('/api/sessions', (req, res) => {
  const list = readJson();
  const id = String(Date.now()) + Math.random().toString(36).slice(2, 8);
  const item = Object.assign({ id }, req.body);
  list.unshift(item);
  writeJson(list);
  res.status(201).json(item);
});

app.put('/api/sessions/:id', (req, res) => {
  const list = readJson();
  const idx = list.findIndex((s) => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  list[idx] = { ...list[idx], ...req.body };
  writeJson(list);
  res.json(list[idx]);
});

app.delete('/api/sessions/:id', (req, res) => {
  let list = readJson();
  const idx = list.findIndex((s) => s.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  list.splice(idx, 1);
  writeJson(list);
  res.json({ ok: true });
});

const port = process.env.MOCK_API_PORT || 3333;
app.listen(port, () => console.log(`Mock API listening on http://localhost:${port}`));
