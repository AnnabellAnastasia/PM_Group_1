export async function fetchAllGroups() {
  try {
    const response = await fetch(`http://localhost:8080/api/groups/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      console.error("there was an error fetching groups");
      return -1;
    } else {
      const res = await response.json();
      console.log("groups returned", res);

      return res;
    }
  } catch (err) {
    console.error(err);
  }
}

export async function newGroup(name: string, description: string, usr: any) {
  try {
    const groupData = {
      name: name,
      desc: description,
      usr: usr,
    };
    const response = await fetch(`http://localhost:8080/api/groups/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(groupData),
      credentials: "include",
    });
    if (!response.ok) {
      console.error("reponse did not return ok in api");
    } else {
      return await response.json();
    }
  } catch (err) {
    console.error(err);
  }
}

export async function joinGroup(id: any, usr: any) {
  try {
    console.log("api called");
    const joinData = {
      id: id,
      usr: usr,
    };
    const response = await fetch(`http://localhost:8080/api/groups/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(joinData),
      credentials: "include",
    });
    if (!response.ok) {
      console.error("response did not return ok in api for join");
    } else if (response.ok) {
      console.log("response was okay");
      return response.status;
    }
  } catch (err) {
    console.error(err);
  }
}

export async function leaveGroup(id: any, usr: any) {
  try {
    console.log("leaving group api called");
    const leaveData = {
      id: id,
      usr: usr
    };
    const response = await fetch(`http://localhost:8080/api/groups/leave`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(leaveData),
      credentials: "include",
    });
    if (!response.ok) {
      console.error("response did not return ok in api for leave");
    } else if (response.ok) {
      console.log("user left");
      return response.status;
    }
  } catch (err) {
    console.error(err);
  }
}

export async function showGroup(id: any) {
  console.log(id);
  try {
    const response = await fetch(`http://localhost:8080/api/groups/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      console.error("reponse did not return ok in api");
    } else {
      return await response.json();
    }
  } catch (err) {
    console.error(err);
  }
}

export async function deleteGroup(id:any, usr:any) {
    const deleteData = {
        id: id,
        usr: usr
      };
      try {
        const response = await fetch(`http://localhost:8080/api/groups/delete`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(deleteData),
            credentials: "include",
          });
          if(!response.ok) {
            console.error('there was an error in the delete api');
          } else {
            return await response.json();
          }

      } catch (err) {
        console.error(err);
      }
}