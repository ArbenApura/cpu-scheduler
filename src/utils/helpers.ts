// IMPORTED TYPES
import type { Process } from '$types/index';

// UTILS
export const getShortestArrival = (processes: Process[]) =>
	processes.sort((a, b) => a.arrival - b.arrival)[0];
export const getShortestBurst = (processes: Process[]) =>
	processes.sort((a, b) => a.burst - b.burst)[0];
