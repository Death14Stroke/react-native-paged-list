import React, { useState } from 'react';
import {
	ActivityIndicator,
	ListRenderItem,
	View,
	Text,
	StyleSheet,
} from 'react-native';
import { PagedList } from '@death14stroke/react-native-paged-list';
import { Todo } from './Todo';
import TodoItem from './TodoItem';
import { fetchTodos } from './api';

export default function App() {
	const [data, setData] = useState<Todo[]>([]);

	const renderTodoItem: ListRenderItem<Todo> = ({ item }) => {
		return <TodoItem todo={item} />;
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>
				Paged list. Scroll to load more data
			</Text>
			<PagedList
				data={data}
				renderItem={renderTodoItem}
				keyExtractor={todo => todo.id.toString()}
				firstPage={0}
				loadData={async page => {
					const todos = await fetchTodos(page);
					setData([...data, ...todos]);
					return todos.length === 0;
				}}
				style={{ flexGrow: 0 }}
				ListFooterComponent={
					<ActivityIndicator
						color="red"
						style={{ margin: 15 }}
						size="large"
					/>
				}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'red',
	},
	container: {
		flex: 1,
		margin: 20,
	},
});
