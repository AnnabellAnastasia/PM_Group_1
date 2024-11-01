export async function fetchAuth() {
	const response = await fetch(`http://localhost:8080/users`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: 'include'
	});
	if (!response.ok) {
		console.error(`An error has occurred: ${response.statusText}`);
		return;
	}
	const user = await response.json();
	if (!user) {
		console.warn(`No user found`);
	}
	return user; 
}

export async function fetchProfile() {
	const response = await fetch(`http://localhost:8080/users/profile`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		credentials: 'include'
	});
	if (!response.ok) {
		console.error(`An error has occurred: ${response.statusText}`);
		return;
	}
	const user = await response.json();
	if (!user) {
		console.warn(`No user found`);
	}
	return user; 
}

export async function handleLogIn(event: any, email: string, password: string, navigate: Function, setUser: Function) {
	event.preventDefault();
	const postBody = {
		email,
		password,
	};
	try {
		const response = await fetch(
			process.env.REACT_APP_SERVER_URI + "/users/login",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					"Set-Cookie": "token"
				},
				body: JSON.stringify(postBody),
				credentials: 'include'
			}
		);
		if (response.status === 200) {
			console.log("success ");
			setUser(await response.json());
			navigate('/posts');
		} else {
			const message = `An error has occurred: ${response.statusText}`;
			console.error(message);
		}
	} catch (err) {
		console.error(err);
		alert("Error logging in please try again");
	}
}

export async function handleSignUp(event: any, navigate: Function, firstName: string, lastName: string, email: string, password: string) {
	event.preventDefault();
	const postBody = {
		firstName,
		lastName,
		email,
		password,
	};
	try {
		const response = await fetch(
			process.env.REACT_APP_SERVER_URI + "/users",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(postBody),
				credentials: 'include'
			}
		);
		if (response.status === 201) {
			console.log("success ", response);
			navigate('/login');
		} else {
			const message = `An error has occurred: ${response.statusText}`;
			console.error(message);
		}
	} catch (err) {
		console.error(err);
		alert("Error signing up please try again");
	}
}

export async function handleLogOut(event: any, navigate: Function, setUser: Function) {
	event.preventDefault();
	try {
		const response = await fetch(
			process.env.REACT_APP_SERVER_URI + "/users/logout",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: 'include'
			}
		);
		if (response.status === 200) {
			console.log("success ", response);
			setUser({
				id: "",
				firstName: "",
				lastName: "",
				image: ""
			});
			navigate('/');
		} else {
			const message = `An error has occurred: ${response.statusText}`;
			console.error(message);
		}
	} catch (err) {
		console.error(err);
		alert("Error logging out please try again");
	}
}

//TODO: get rid of this when we implement friends
export async function fetchAllUsersTest() {
	try {
		const response = await fetch(
			process.env.REACT_APP_SERVER_URI + "/users/everyUserTest", 
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
				credentials: 'include'
			}
		);
		if (!response.ok) {
			console.error(`An error has occurred: ${response.statusText}`);
			return;
		}
		const users = await response.json();
		if (!users) {
			console.warn(`No users found`);
		}
		return users; 
	} catch (err) {
		console.error(err);
		alert("Error please try again");
	}
}
