export type Process = {
	id: number;
	arrival: number;
	burst: number;
	completion: number;
	turnaround: number;
	remaining: number;
	waiting: number;
};
export type GanttItem = {
	id: number;
	value: number;
};
