'use client';
import { useMemo, useState } from 'react';
import { analyzeComments, toPlan } from '../lib/ideas.mjs';
const sample = `How do you edit videos so quickly?\nWhat camera do you use?\nHow do you edit reels with captions?\nI struggle to make a content calendar.\nI love the clear examples.\nHow do you find brand deals?`;
function download(name: string, text: string, type: string) { const url = URL.createObjectURL(new Blob([text], { type })); const link = document.createElement('a'); link.href = url; link.download = name; link.click(); URL.revokeObjectURL(url); }
export default function Page() {
  const [input, setInput] = useState(sample);
  const [analyzed, setAnalyzed] = useState(sample);
  const groups = useMemo(() => analyzeComments(analyzed.split(/\r?\n/)), [analyzed]);
  const plan = useMemo(() => toPlan(groups), [groups]);
  return <main><div className="eyebrow">CREATOR RESEARCH · LOCAL ANALYSIS</div><header><h1>Comment Idea Generator</h1><p>Turn repeated audience questions into a simple content plan. Paste comments below; the demo processes text in your browser.</p></header>
    <section><label htmlFor="comments">Comments, one per line</label><textarea id="comments" value={input} onChange={e => setInput(e.target.value)} /><div className="row"><button onClick={() => setAnalyzed(input)}>Analyze comments</button><button className="secondary" onClick={() => { setInput(sample); setAnalyzed(sample); }}>Load example</button></div></section>
    <section><h2>Recurring themes</h2><div className="grid">{groups.slice(0, 12).map(g => <article key={`${g.kind}-${g.topic}`}><span className="pill">{g.kind}</span><h3>{g.topic}</h3><p>{g.count} comment{g.count === 1 ? '' : 's'}</p><small>{g.examples[0]}</small></article>)}</div></section>
    <section><div className="row"><h2>Content plan</h2><button className="secondary" onClick={() => download('content-plan.md', plan.map(p => `## ${p.title}\n\nHook: ${p.hook}\n\n${p.outline.map(x => `- ${x}`).join('\n')}`).join('\n\n'), 'text/markdown')}>Export Markdown</button><button className="secondary" onClick={() => download('content-plan.csv', ['title,hook,category,count', ...plan.map(p => [p.title,p.hook,p.kind,p.count].map(x => `"${String(x).replaceAll('"','""')}"`).join(','))].join('\n'), 'text/csv')}>Export CSV</button></div>{plan.map(p => <article key={p.title}><h3>{p.title}</h3><p><b>Hook:</b> {p.hook}</p><ol>{p.outline.map(x => <li key={x}>{x}</li>)}</ol></article>)}</section><footer>Automated groups are rough suggestions. Review source comments before publishing. This demo does not scrape social sites or post content.</footer></main>;
}
