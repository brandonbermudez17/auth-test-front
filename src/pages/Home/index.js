import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { gql, useLazyQuery } from "@apollo/client";
import { useRouter } from "@uirouter/react";

const GET_USER = gql`
  query GetUser($token: String!) {
    getUser(token: $token) {
      username
      email
    }
  }
`;

const HomePage = () => {
  const { accessToken, reset } = useContext(AuthContext);
  const router = useRouter();
  const [getDog, { loading, data }] = useLazyQuery(GET_USER);

  useEffect(() => {
    getDog({ variables: { token: accessToken } });
  }, []);

  const logout = () => {
    reset();
    router.stateService.go("login");
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <button
        onClick={logout}
        className="bg-red-400 text-white w-32 p-2 absolute top-1 right-2"
      >
        Logout
      </button>
      {!loading ? (
        <div className="w-48 h-64 rounded-xl bg-gray-500 flex flex-col shadow">
          <img
            className="w-auto rounded-t-xl"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIhCBq-WV5kdxy5e-8fgzaYKejJFYOUnTt1Q&usqp=CAU"
            alt="avatar"
          />
          {data && (
            <div className="text-center flex flex-col p-2">
              <span className="text-base text-white font-bold">
                {data?.getUser?.username}
              </span>
              <span className="text-xs text-white italic">
                {data?.getUser?.email}
              </span>
            </div>
          )}
        </div>
      ) : (
        <div className=" flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      )}
    </div>
  );
};

const HomePageState = {
  name: "home",
  url: "/home",
  component: HomePage,
  redirectTo: () => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    if (!accessToken && !refreshToken) {
      return 'login'
    }
  }
};

export default HomePageState;
