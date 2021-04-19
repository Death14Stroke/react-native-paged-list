import { FlatListProps } from 'react-native';

export type PagedListProps<T> = FlatListProps<T> & {
	firstPage: number;
	loadData: (page: number) => Promise<boolean>;
};
