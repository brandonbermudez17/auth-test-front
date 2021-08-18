import React from "react";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "@uirouter/react";

const SIGNUP = gql`
  mutation SIGNUP($email: String!, $username: String!, $password: String!) {
    createUser(email: $email, username: $username, password: $password) {
      user {
        email
        username
      }
    }
  }
`;

const SignUpPage = () => {
  const [signup,] = useMutation(SIGNUP);
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async ({email, username, password}, e) => {
    e.preventDefault();
    try {
      const res = await signup({ variables: { email, username, password } });
      alert('usuario registrado')
      goToLoginPage()
    } catch (err) {
      console.log(err);
    }
    e.target.reset();
  };

  const goToLoginPage = () => {
    router.stateService.go('login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500">
      <div className="bg-white p-16 rounded shadow-2xl w-2/3">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">
          Create Your Account
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block mb-1 font-bold text-gray-500">
              Username
            </label>
            <input
              type="text"
              className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
              name="username"
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
          <div>
            <label className="block mb-1 font-bold text-gray-500">Email</label>
            <input
              type="email"
              className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
              name="email"
              {...register("email", {
                required: {
                  value: true,
                  message: "El email es requerido",
                },
                pattern: {
                  value:
                    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
                  message: "Direccion de correo electronico invalida",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-400 block mb-2">
                {errors?.email?.message}
              </span>
            )}
          </div>
          <div>
            <label className="block mb-1 font-bold text-gray-500">
              Password
            </label>
            <input
              type="password"
              className="w-full border-2 border-gray-200 p-3 rounded outline-none focus:border-purple-500"
              name="password"
              {...register("password", {
                required: {
                  value: true,
                  message: "El password es requerido",
                },
                minLength: {
                  value: 8,
                  message: "El password debe tener al menos 8 caracteres",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-400 block mb-2">
                {errors?.password?.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="block w-full bg-yellow-400 hover:bg-yellow-300 p-4 rounded text-yellow-900 hover:text-yellow-800 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <button
            type="button"
            onClick={goToLoginPage}
            className="mt-2 block w-full bg-purple-400 hover:bg-purple-300 p-4 rounded text-white hover:text-yellow-800 transition duration-300"
          >
            Cancel
          </button>
      </div>
    </div>
  );
};
const SignUpPageState = {
  name: "signup",
  url: "/signup",
  component: SignUpPage,
};

export default SignUpPageState;
