export async function fetchAllGroups() {
    try {
        const response = await fetch(`http://localhost:8080/api/groups/`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });
        if(!response.ok) {
            console.error("there was an error fetching groups");
            return -1;
        }else {
            console.log("groups returned", response);
            return response;
        }
    } catch (err) {
        console.error(err);
    }
}