import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_USERS } from "./query/user";
import { CREATE_USER } from "./mutations/user";
import "./styles.css";

const App = () => {
	const { data, loading, refetch } = useQuery(GET_ALL_USERS);

	const [newUser] = useMutation(CREATE_USER);
	const [users, setUsers] = useState([]);
	const [username, setUsername] = useState("");
	const [age, setAge] = useState(0);

	useEffect(() => {
		if (!loading) {
			setUsers(data.getAllUsers);
		}
	}, [data]);

	const addUser = (e) => {
		e.preventDefault();
		newUser({
			variables: {
				input: {
					username,
					age,
				},
			},
		}).then(({ data }) => {
			console.log(data);
			setUsername("");
			setAge(0);
		});
	};

	const getAll = (e) => {
		e.preventDefault();
		refetch();
	};

	if (loading) {
		return <h1>Loader...</h1>;
	}

	return (
		<div>
			<form>
				<input
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					type="text"
				/>
				<input
					value={age}
					onChange={(e) => setAge(e.target.value)}
					type="number"
				/>
				<div className="btns">
					<button
						onClick={(e) => {
							addUser(e);
							refetch();
						}}
					>
						Создать
					</button>
					<button onClick={(e) => getAll(e)}>Получить</button>
				</div>
			</form>
			<div>
				{users.map((user) => (
					<div className="user">
						<span>id: {user.id}.</span>•<span>name: {user.username}</span>•
						<span>age: {user.age}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default App;
