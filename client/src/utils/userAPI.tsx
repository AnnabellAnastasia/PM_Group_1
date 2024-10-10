export async function handleLogInSubmit(event: any, navigate: Function, email: string, password: string) {
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
				},
				body: JSON.stringify(postBody),
				credentials: 'include'
			}
		);
		if (response.status === 200) {
			console.log("success ", response);
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

export async function handleSignUpSubmit(event: any, navigate: Function, firstName: string, lastName: string, email: string, password: string) {
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

