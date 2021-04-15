import React, { FC } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Todo } from './Todo';

interface Props {
	todo: Todo;
}

const TodoItem: FC<Props> = ({ todo }) => {
	const { title } = todo;

	return (
		<View style={styles.container}>
			<Text style={styles.text}>{title}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		padding: 5,
	},
	text: {
		fontSize: 20,
	},
});

export default TodoItem;
