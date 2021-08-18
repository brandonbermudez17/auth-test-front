import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "@uirouter/react";
import { AuthContext } from "../../context/AuthContext";

const LOGIN_AUTH = gql`
  mutation Auth($username: String!, $password: String!) {
    auth(username: $username, password: $password) {
      accessToken
      refreshToken
    }
  }
`;

const LoginPage = () => {
  const [auth, { error }] = useMutation(LOGIN_AUTH);
  const router = useRouter();
  const { setTokens, setAuth } = useContext(AuthContext)

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async ({ username, password }, e) => {
    e.preventDefault();
    try {
      const {
        data: {
          auth: { accessToken, refreshToken },
        },
      } = await auth({ variables: { username, password } });
      setTokens(accessToken, refreshToken)
      setAuth(true)
      alert('usuario autenticado')
      goToHomePage()
    } catch (err) {
      console.log(err);
    }
    e.target.reset();
  };

  const goToSignUpPage = () => {
    router.stateService.go('signup')
  }

  const goToHomePage = () => {
    router.stateService.go('home')
  }

  return (
    <div className="w-full h-screen bg-blue-500">
      <div className="container mx-auto p-2">
        <div className="max-w-sm mx-auto my-24 bg-white px-5 py-10 rounded shadow-xl">
          <div className="text-center mb-8">
            <h1 className="font-bold text-2xl font-bold">Login Auth</h1>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-5">
              <label>Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="block w-full p-2 border rounded border-gray-500"
                {...register("username", {
                  required: {
                    value: true,
                    message: "El username es requerido",
                  },
                })}
              />
              {errors.username && (
                <span className="text-red-400 block mb-2">
                  {errors?.username?.message}
                </span>
              )}
            </div>
            <div className="mt-5">
              <label>Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="block w-full p-2 border rounded border-gray-500"
                {...register("password", {
                  required: {
                    value: true,
                    message: "El password es requerido",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-400 block mb-2">
                  {errors?.password?.message}
                </span>
              )}
            </div>
            <div className="mt-10">
              <button
                type="submit"
                className="py-3 bg-green-500 hover:bg-green-600 rounded text-white text-center w-full"
              >Login</button>
            </div>
            {error && (
              <span className="text-red-400 block mb-2">
                Error: username o password no validos
              </span>
            )}
          </form>
          <button
            type="button"
            onClick={goToSignUpPage}
            className="mt-1 py-3 bg-purple-500 hover:bg-purple-600 rounded text-white text-center w-full"
          >SignUp</button>
        </div>
      </div>
    </div>
  );
};

const LoginPageState = {
  name: "login",
  url: "/login",
  component: LoginPage,
};

export default LoginPageState;
