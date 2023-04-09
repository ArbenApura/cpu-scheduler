// IMPORTED TYPES
import type { Process } from '$types/index';

// UTILS
export const sleep = (timeout: number) => new Promise((res) => setTimeout(res, timeout));
export const getShortestArrival = (processes: Process[]) =>
	processes.sort((a, b) => a.arrival - b.arrival)[0];
export const getShortestBurst = (processes: Process[]) =>
	processes.sort((a, b) => a.burst - b.burst)[0];
