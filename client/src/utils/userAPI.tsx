export async function fetchAuth() {
  try {
    const response = await fetch(`http://localhost:8080/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
  } catch (err) {
    console.error(err);
  }
}

export async function fetchProfile() {
  try {
    const response = await fetch(`http://localhost:8080/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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
  } catch (err) {
    console.error(err);
  }
}

export async function handleLogIn(
  event: any,
  email: string,
  password: string,
  navigate: Function,
  setUser: Function,
  setPageAlert: Function
) {
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
          "Set-Cookie": "token",
        },
        body: JSON.stringify(postBody),
        credentials: "include",
      }
    );
    if (response.status === 200) {
      console.log("success");
      const { user, success } = await response.json();
      setUser(user);
      setPageAlert({ success, error: "" });
      navigate("/posts");
    } else if (response.status === 401) {
      const { error } = await response.json();
      setPageAlert({ error, success: "" });
    } else {
      const message = `An error has occurred: ${response.statusText}`;
      console.error(message);
    }
  } catch (err) {
    console.error(err);
  }
}

export async function handleSignUp(
  event: any,
  navigate: Function,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  setPageAlert: Function
) {
  event.preventDefault();
  const postBody = {
    firstName,
    lastName,
    email,
    password,
  };
  try {
    const response = await fetch(process.env.REACT_APP_SERVER_URI + "/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postBody),
      credentials: "include",
    });
    if (response.status === 201) {
      const { success } = await response.json();
      console.log("success ", success);
      setPageAlert({ success, error: "" });
      navigate("/login");
    } else if (response.status === 401) {
      const { error } = await response.json();
      console.log("error ", error);
      setPageAlert({ error, success: "" });
    } else {
      const message = `An error has occurred: ${response.statusText}`;
      console.error(message);
    }
  } catch (err) {
    console.error(err);
  }
}

export async function handleLogOut(
  event: any,
  navigate: Function,
  setUser: Function
) {
  event.preventDefault();
  try {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URI + "/users/logout",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    if (response.status === 200) {
      console.log("success ", response);
      setUser({
        id: "",
        firstName: "",
        lastName: "",
        image: "",
      });
      navigate("/");
    } else {
      const message = `An error has occurred: ${response.statusText}`;
      console.error(message);
    }
  } catch (err) {
    console.error(err);
  }
}
