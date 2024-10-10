import {useState, useEffect} from 'react';

function CreateUser() {
	const[userList, setUserList] = useState<any>([]);
	const[newUser, setNewUser] = useState({
		username: "",
		password:""
	});

	// Update User Info state values
	function updateUserInfo(value: any) {
		console.log("value", value);
		return setNewUser((prev) => {
			return {...prev, ...value};
		});
	}

	// Fetch user data
	async function fetchUsers() {
		const response = await fetch(`http://localhost:8080/users`);
		if (!response.ok) {
			console.error(`An error has occurred: ${response.statusText}`);
			return;
		}
		const users = await response.json();
		if (!users) {
			console.warn(`No users found`);
		}
		setUserList(users);
		console.log("users", users);
	}

	useEffect(() => {
		fetchUsers();
	}, [])

	// Submit function for username form
	async function submitUser(event: any) {
		const user = {...newUser};
		let response;
		try {
			response = await fetch(`http://localhost:8080/users/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(user),
			});
			if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
		} catch (error) {
      console.error('A problem occurred with your fetch operation: ', error);
		}
	}

  return (
    <>
			<h1>Users</h1>
			<form onSubmit={submitUser}>
				<label htmlFor="username">Username</label>
				<input type="text" name="username" placeholder="Username" value={newUser.username} onChange={(event) => updateUserInfo({username: event.target.value})}/>
				<label htmlFor='password'>Password</label>
				<input type='password'name='password'placeholder='Password'value={newUser.password} onChange={(event)=>updateUserInfo({password:event.target.value})}/>
				<button type="submit">Submit</button>
			</form>
			<ul>
				{userList.map(function(data: any) {
					return (
						<li key={data._id}>
							{data.username}
							{data.password}
						</li>
						// <li key={data._id}>
						// 	{data.password}
						// </li>
					)
				})}
			</ul>
    </>
  );
}

export default CreateUser;