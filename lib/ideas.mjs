const stop = new Set(['what','where','when','why','how','the','and','for','with','this','that','from','your','have','about','would','could','please','really','there','their','which']);
export function analyzeComments(lines) {
  const groups = new Map();
  for (const raw of lines) {
    const text = String(raw).trim().slice(0, 1000);
    if (!text) continue;
    const kind = /\?|\bhow|\bwhat|\bwhere|\bwhen|\bwhy/i.test(text) ? 'question' : /\b(problem|issue|hard|difficult|hate|confused|struggle|cannot|can.t)\b/i.test(text) ? 'pain point' : /\b(love|great|amazing|helpful|thanks|thank you)\b/i.test(text) ? 'praise' : 'other';
    const tokens = (text.toLowerCase().match(/[\p{L}\p{N}]{4,}/gu) ?? []).filter(t => !stop.has(t));
    const topic = tokens[0] ?? 'general';
    const key = `${kind}:${topic}`;
    const group = groups.get(key) ?? { kind, topic, count: 0, examples: [] };
    group.count++;
    if (group.examples.length < 3) group.examples.push(text);
    groups.set(key, group);
  }
  return [...groups.values()].sort((a, b) => b.count - a.count);
}
export function toPlan(groups) {
  return groups.filter(g => g.kind !== 'other').slice(0, 10).map(g => ({ ...g, title: g.kind === 'question' ? `Answer: ${g.examples[0].replace(/\?+$/, '')}` : g.kind === 'pain point' ? `Solve ${g.topic}: a practical walkthrough` : `What works about ${g.topic}`, hook: g.kind === 'question' ? `People keep asking: ${g.examples[0]}` : `A common ${g.kind}: ${g.examples[0]}`, outline: ['The audience question', 'A concrete example', 'Steps and takeaways'] }));
}
