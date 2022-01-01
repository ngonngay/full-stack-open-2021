import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHOR, UPDATE_BORN } from '../query';
import Select from 'react-select';

const Authors = (props) => {
	const [born, setBorn] = useState('');
	const { loading, data, error } = useQuery(ALL_AUTHOR);
	const [selectedOption, setSelectedOption] = useState(null);
	const options = data?.allAuthors?.map((option) => {
		return {
			value: option.name,
			label: option.name,
		};
	});
	const [updateBorn] = useMutation(UPDATE_BORN, {
		refetchQueries: [{ query: ALL_AUTHOR }],
	});
	if (!props.show) {
		return null;
	}
	if (error) return <p>Error :(</p>;
	//if (error) return <p>{error}</p>;
	if (loading) {
		return <p>Loading...</p>;
	}
	const submit = async (event) => {
		event.preventDefault();
		console.log(selectedOption);
		updateBorn({ variables: { name: selectedOption.value, born } });
		setSelectedOption('');
		setBorn('');
	};

	return (
		<div>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th>Name</th>
						<th>born</th>
						<th>books</th>
					</tr>
					{data?.allAuthors.map((a) => (
						<tr key={a.name}>
							<td>{a.name}</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
			<br />
			<form onSubmit={submit}>
				<Select
					defaultValue={selectedOption}
					onChange={setSelectedOption}
					options={options}
					name='name'
				/>
				<br />
				<div>
					born {'     '}
					<input
						value={born}
						name='born'
						type='number'
						onChange={({ target }) => setBorn(Number(target.value))}
					/>
				</div>

				<button type='submit'>update born</button>
			</form>
		</div>
	);
};

export default Authors;
