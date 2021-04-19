import { FlatListProps } from 'react-native';

export { default as PagedList } from './PagedList';

export type PagedListProps<T> = FlatListProps<T> & {
	firstPage: number;
	loadData: (page: number) => Promise<boolean>;
};
