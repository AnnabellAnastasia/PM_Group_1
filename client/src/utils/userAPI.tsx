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

export async function fetchProfileFromID(userID: string) {
  if (!userID) return;

  try {
    const response = await fetch(`http://localhost:8080/users/${userID}`, {
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

export async function fetchProfileFromLoggedInUser() {
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

export async function searchUser(event: any, input: String) {
  event.preventDefault();
  const term = input;
  try {
    const response = await fetch(
      process.env.REACT_APP_SERVER_URI + `/users/search?searchterm=${term}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const user = await response.json();
    if (!user) {
      console.warn(`No user found`);
    }
    return user;
  } catch (err) {
    console.error(err);
  }
}

export async function updateUser(userID: string, userBody: Object) {
  let response;
  try {
    response = await fetch(`http://localhost:8080/users/${userID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userBody),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  } catch (error) {
    console.error("A problem occurred with your fetch operation: ", error);
  }
}

export async function uploadImage(userID: string, imageData: FormData) {
  console.log("userBody", imageData);
  let response;
  try {
    response = await fetch(`http://localhost:8080/users/${userID}/image`, {
      method: "POST",
      headers: {},
      body: imageData,
      credentials: "include",
    });
    if (!response.ok) {
      console.error(response);
    }
    const image = await response.json();
    console.log("fnreturn", image);
    if (!image) {
      console.warn(`No image found`);
    }
    return image;
  } catch (error) {
    console.error("A problem occurred with your fetch operation: ", error);
  }
}

export async function getFriendRequests(userID: string) {
  if (!userID) return;

  try {
    const response = await fetch(`http://localhost:8080/users/${userID}/friendRequests`, {
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
    const requests = await response.json();
    if (!requests) {
      console.warn(`No user found`);
    }
    return requests;
  } catch (err) {
    console.error(err);
  }
}

export async function sendFriendRequest(
  senderID: string,
  recipientID: string,
  setPageAlert: Function
) {
  const request = {
    sender: senderID,
    recipient: recipientID,
  };
  let response;
  try {
    response = await fetch(`http://localhost:8080/users/${senderID}/friendRequests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
      credentials: "include",
    });
    if (!response.ok) {
      setPageAlert({error: response.status, success: ""})
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      setPageAlert({success: "Friend Request Sent", error: ""})
    }
    return;
  } catch (error) {
    console.error("A problem occurred with your fetch operation: ", error);
  }
}

export async function declineFriendRequest(
  requestID: string,
  recipientID: string
) {
  console.log(requestID, recipientID);
  let response;
  try {
    response = await fetch(`http://localhost:8080/users/${recipientID}/friendRequests/${requestID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return;
  } catch (error) {
    console.error("A problem occurred with your fetch operation: ", error);
  }
}

export async function acceptFriendRequest(
  requestID: string,
  recipientID: string,
  senderID: string,

) {
  const friendship = {
    sender: senderID,
    recipient: recipientID,
  };
  let response;
  try {
    response = await fetch(`http://localhost:8080/users/${recipientID}/friendRequests/${requestID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(friendship),
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return;
  } catch (error) {
    console.error("A problem occurred with your fetch operation: ", error);
  }
}

export async function getFriends(userID: string) {
  if (!userID) return;

  try {
    const response = await fetch(`http://localhost:8080/users/${userID}/friendships`, {
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
    const requests = await response.json();
    if (!requests) {
      console.warn(`No user found`);
    }
    return requests;
  } catch (err) {
    console.error(err);
  }
}

export async function removeFriend(
  userID: string,
  friendshipID: string,
  setPageAlert: Function
) {
  let response;
  try {
    response = await fetch(`http://localhost:8080/users/${userID}/friendships/${friendshipID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      setPageAlert({error: response.status, success: ""})
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      setPageAlert({success: "Friend has been removed", error: ""})
    }
    return;
  } catch (error) {
    console.error("A problem occurred with your fetch operation: ", error);
  }
}

export async function getSuggestedConnections(userID: string) {
  if (!userID) return;

  try {
    const response = await fetch(`http://localhost:8080/users/${userID}/suggestions`, {
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
    const requests = await response.json();
    if (!requests) {
      console.warn(`No user found`);
    }
    return requests;
  } catch (err) {
    console.error(err);
  }
}