import axios from "axios";

export async function loginUser(username, password) {
    try {
      const request = await axios({
        method: "POST",
        url: `https://marthacoffee.herokuapp.com/api/`,
        headers: { "username": `${username}`,"password": `${password}` },
      })
      // console.log(request)
      return request;
    } catch (err) {
      console.error(err.message);
    }
  }


