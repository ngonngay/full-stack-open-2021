import React, { useState, useEffect } from 'react';
import axios from 'axios';
import personsService from './services/persons';
import { nanoid } from 'nanoid';
import './index.css';

const Filter = ({ handleFilter, value }) => {
	return (
		<div>
			filter show with <input onChange={handleFilter} value={value} />
		</div>
	);
};
const PersonForm = ({ handleSubmit, setNewName, setNewNumber, newName, newNumber }) => {
	return (
		<form onSubmit={handleSubmit}>
			<div>
				name:
				<input onChange={setNewName} value={newName} required />
				<div>
					number:
					<input onChange={setNewNumber} value={newNumber} required />
				</div>
			</div>
			<div>
				<button type='submit'>add</button>
			</div>
		</form>
	);
};
const Notification = ({ message }) => {
	if (message.message === null) {
		return null;
	}

	return <div className={message.type}>{message.message}</div>;
};
const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');
	const [message, setMessage] = useState({ message: null });
	useEffect(() => {
		personsService
			.getAll()
			.then((response) => {
				console.log(response.data.phones);
				setPersons(response.data.phones);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
	const checkExist = (persons, newName) => {
		//console.log(persons.map((persons) => persons.name).includes(newName));
		return persons.map((persons) => persons.name).includes(newName.trim());
	};
	const handleDelete = (id, name) => {
		let deleted = window.confirm('Are you sure you want to delete this?');
		console.log(id);
		if (deleted) {
			personsService
				.deleted(id)
				.then((response) => {
					//console.log(response);
					if (response.data.succeed) {
						personsService.getAll().then((response) => {
							setPersons(response.data.phones);
						});
						setMessage({
							message: `Deleted ${name}`,
							type: 'succeed',
						});
						setTimeout(() => {
							setMessage({ message: null });
						}, 5000);
					}
				})
				.catch((error) => {
					setMessage({
						message: `${error}`,
						type: 'error',
					});
					setTimeout(() => {
						setMessage({ message: null });
					}, 5000);
				});
		}
	};
	const handleSubmit = (e) => {
		e.preventDefault();

		if (!checkExist(persons, newName)) {
			personsService
				.create({ name: newName.trim(), number: newNumber.trim() })
				.then((response) => {
					console.log(response);
					console.log(response.data.savedPhone.id);
					setPersons(
						persons.concat({
							id: response.data.savedPhone.id,
							name: newName.trim(),
							number: newNumber,
						}),
					);
					setMessage({
						message: `Added ${newName}`,
						type: 'succeed',
					});
					setTimeout(() => {
						setMessage({ message: null });
					}, 5000);
					setNewName('');
					setNewNumber('');
				})
				.catch((error) => {
					console.log({ error });
					setMessage({
						message: `${error}`,
						type: 'error',
					});
				});
		} else {
			let update = window.confirm(
				`${newName} is already added to phonebook,replace the old number with the new one?`,
			);
			let updateId = -1;
			if (update) {
				persons.forEach((person) => {
					if (person.name === newName) {
						updateId = person.id;
					}
				});
				if (updateId != -1) {
					console.log(updateId);
					personsService
						.replace(updateId, {
							name: newName.trim(),
							number: newNumber.trim(),
						})
						.then((response) => {
							if (response.data.succeed) {
								setMessage({
									message: `Updated number for ${newName}`,
									type: 'succeed',
								});
								setTimeout(() => {
									setMessage({
										message: null,
									});
								}, 5000);
								setNewName('');
								setNewNumber('');
								personsService
									.getAll()
									.then((response) => {
										setPersons(
											response
												.data
												.phones,
										);
									});
							} else {
								console.log(response.data);
								setMessage({
									message: `Updated number for ${newName} failed! Try again or refresh the page`,
									type: 'error',
								});
							}
						});
				}
			}
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={message} />
			<Filter handleFilter={(e) => setFilter(e.target.value)} value={filter} />
			<h1>Add a new phone</h1>
			<PersonForm
				handleSubmit={(e) => handleSubmit(e)}
				setNewName={(e) => setNewName(e.target.value)}
				setNewNumber={(e) => setNewNumber(e.target.value)}
				newName={newName}
				newNumber={newNumber}
			/>

			<h2>Numbers</h2>
			{persons
				.filter((person) =>
					person.name.toUpperCase().includes(filter.toUpperCase()),
				)
				.map((person) => (
					<p key={nanoid()}>
						{`${person.name}  ${person.number}`}{' '}
						<button
							onClick={() =>
								handleDelete(person.id, person.name)
							}>
							Delete
						</button>{' '}
					</p>
				))}
		</div>
	);
};

export default App;
