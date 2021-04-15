import todos from './data.json';
import { Todo } from './Todo';

const PAGE_SIZE = 20;

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const fetchTodos = async (page: number): Promise<Todo[]> => {
	const start = page * PAGE_SIZE,
		end = start + PAGE_SIZE;
	await delay(3000);
	return todos.slice(start, end);
};
