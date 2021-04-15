import React, { PropsWithChildren, useEffect, useReducer } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { PagedListProps } from './types';

type State = {
	loading: boolean;
	page: number;
	isListEnd: boolean;
};
type Action = {
	type: 'data_loading' | 'page_loaded' | 'list_end_reached';
	payload?: any;
};

const getInitialState = (firstPage: number): State => {
	return {
		loading: false,
		page: firstPage,
		isListEnd: false,
	};
};

const pagingReducer = (state: State, action: Action) => {
	switch (action.type) {
		case 'data_loading':
			return { ...state, loading: true };
		case 'page_loaded':
			return {
				...state,
				page: state.page + 1,
				loading: false,
			};
		case 'list_end_reached':
			return { ...state, isListEnd: true, loading: false };
		default:
			return state;
	}
};

const PagedList = <T extends any>({
	firstPage,
	loadData,
	...flatListProps
}: PropsWithChildren<PagedListProps<T>>) => {
	const [state, dispatch] = useReducer(
		pagingReducer,
		getInitialState(firstPage)
	);

	const { loading, page, isListEnd } = state;
	const { ListEmptyComponent, ListFooterComponent } = flatListProps;

	const getData = async () => {
		if (!loading && !isListEnd) {
			dispatch({ type: 'data_loading' });

			try {
				const endReached = await loadData(page);
				if (!endReached) {
					dispatch({ type: 'page_loaded' });
				} else {
					dispatch({ type: 'list_end_reached' });
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	const renderFooter = () => {
		return loading ? ListFooterComponent : null;
	};

	const renderEmptyView = () => {
		if (!loading) {
			return ListEmptyComponent;
		}
		return null;
	};

	useEffect(() => {
		getData();
	}, []);

	return (
		<FlatList
			{...flatListProps}
			extraData={flatListProps.extraData || state}
			onEndReachedThreshold={flatListProps.onEndReachedThreshold || 0.5}
			onEndReached={info => {
				getData();
				flatListProps.onEndReached && flatListProps.onEndReached(info);
			}}
			contentContainerStyle={[
				flatListProps.contentContainerStyle,
				styles.contentContainerStyle,
			]}
			ListFooterComponent={renderFooter()}
			ListEmptyComponent={renderEmptyView()}
		/>
	);
};

const styles = StyleSheet.create({
	contentContainerStyle: {
		flexGrow: 1,
		justifyContent: 'center',
	},
});

export default PagedList;
