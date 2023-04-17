// IMPORTED TYPES
import type { Process, GanttItem } from '$types/index';
// IMPORTED STATES
import { processes, ganttItems, timeQuantum } from '$stores/processStates';

// UTILS
export const resetStates = () => {
	processes.set([]);
	ganttItems.set([]);
	timeQuantum.set(0);
};
export const resetValues = () =>
	processes.update((values) =>
		values.map((process) => {
			process.remaining = process.burst;
			process.completion = 0;
			process.turnaround = 0;
			process.waiting = 0;
			return process;
		}),
	);
export const replaceProcess = (value: Process) =>
	processes.update((values) =>
		values.map((process) => (process.id === value.id ? value : process)),
	);
export const replaceProcesses = (values: Process[]) => values.map((value) => replaceProcess(value));
export const addProcess = (id: number, arrival: number, burst: number) =>
	processes.update((values) => [
		...values,
		{
			id,
			arrival,
			burst,
			remaining: burst,
			completion: 0,
			turnaround: 0,
			waiting: 0,
		},
	]);
export const editProcess = (id: number, arrival: number, burst: number) =>
	processes.update((values) =>
		values.map((process) => {
			if (process.id !== id) return process;
			process.arrival = arrival;
			process.burst = burst;
			process.remaining = burst;
			return process;
		}),
	);
export const deleteProcess = (id: number) =>
	processes.update((values) => values.filter((process) => process.id !== id));
export const addGanttItem = (item: GanttItem) => ganttItems.update((values) => [...values, item]);
export const incrementLastGanttItem = () =>
	ganttItems.update((values) =>
		values.map((item, i) => {
			if (i + 1 === values.length) item.value++;
			return item;
		}),
	);
export const initializeProcessStates = () => {};
