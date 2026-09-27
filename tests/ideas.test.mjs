import { test } from 'node:test';
import { strict as assert } from 'node:assert';
import { analyzeComments, toPlan } from '../lib/ideas.mjs';
test('clusters recurring questions and generates a plan', () => {
  const groups = analyzeComments(['How do I edit videos?', 'How do I edit faster?', 'Love this!']);
  assert.equal(groups[0].kind, 'question');
  assert.equal(groups[0].count, 2);
  assert.ok(toPlan(groups)[0].title.startsWith('Answer:'));
});
