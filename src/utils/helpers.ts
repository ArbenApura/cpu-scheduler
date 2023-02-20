export const sleep = (timeout: number) => new Promise((res) => setTimeout(res, timeout));
export const generateRandomId = (length: number) => {
	const entries = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	return Array(length)
		.join()
		.split(',')
		.map(function () {
			return entries.charAt(Math.floor(Math.random() * entries.length));
		})
		.join('');
};
