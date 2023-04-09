// IMPORTED TYPES
import type { Process, GanttItem } from '$types/index';
// IMPORTED LIB-UTILS
import { writable } from 'svelte/store';

// STATES
export const processes = writable<Process[]>([]);
export const ganttItems = writable<GanttItem[]>([]);
export const processStates = { processes, ganttItems };
