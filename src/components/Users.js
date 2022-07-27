import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();
  const refresh = useRefreshToken();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController(); // used to cancel request when component unmounts

    const getUsers = async () => {
      const test_url = "/api/users/";
      const event_url = "/users/";

      try {
        const response = await axiosPrivate.get(event_url, {
          signal: controller.signal // to make cancel request possible when component unmounts
        });
        // console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err)
        // when tokens expire during user's session, user has to log in again,
        // but after they log in, they are taken back to the location they were before
        navigate('/login', { state: { from: location }, replace: true });
      }
    }

    getUsers();

    // clean up
    return () => {
      isMounted = false;
      controller.abort();
    }

  }, [])


  return (
    <div>
      <h2>Users list</h2>
      {users?.length
        ? (
          <ul>
            {users.map((user, i) =>
              <li key={i}>{user?.name} {user?.login}</li>)}

          </ul>
        ) : (
          <p>No users to display</p>
        )
      }
      <br/>
      <button onClick={() => refresh()}>Refresh</button>
    </div>
  )
}

export default Users;
