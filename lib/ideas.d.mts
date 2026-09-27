export type Group = { kind: 'question' | 'pain point' | 'praise' | 'other'; topic: string; count: number; examples: string[] };
export type PlanItem = Group & { title: string; hook: string; outline: string[] };
export function analyzeComments(lines: string[]): Group[];
export function toPlan(groups: Group[]): PlanItem[];
