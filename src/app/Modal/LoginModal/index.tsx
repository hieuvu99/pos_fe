import { AuthenticationMethod } from "@/app/Utilities/Fetch/AuthenticationMethod";
import { User } from "@/app/Utilities/Interfacte/User";
import { useSnackbar } from "@/app/Utilities/SnackBar";
import { Button } from "@mui/material";
import React, { useEffect, useState } from "react";

function LoginModal() {
  const { handleSnackbar } = useSnackbar();
  const [loginUser, setLoginUser] = useState<User>({
    userName: null,
    userPassword: null,
  });

  const logIn = async (e: any) => {
    e.preventDefault();
    AuthenticationMethod(
      "/authenticate/login",
      loginUser,
      handleSnackbar as any
    );
  };
  useEffect(() => {});
  return (
    <form
      onSubmit={logIn}
      className="h-96 lg:w-5/12 2xl:w-4/12 border-solid shadow-2xl shadow-neutral-500 drop-shadow-md rounded-2xl flex justify-center"
    >
      <div className="lg:w-3/5 2xl:w-3/4 grid grid-rows-4 ">
        <div className="logo flex justify-center font-thin  mb-5">
          <p>Kafe</p>
        </div>
        <div className="ms-5 me-5 mt-1">
          <p className="mb-2 font-extrabold">Username</p>
          <input
            name="username"
            onChange={(e) => {
              // handleInputChange(e);
              setLoginUser({ ...loginUser, userName: e.target.value });
            }}
            type="text"
            className="md:w-72 lg:w-full"
          />
        </div>
        <div className="ms-5 me-5 mt-1">
          <p className="mb-2 font-extrabold">Password</p>
          <input
            name="password"
            onChange={(e) => {
              // handleInputChange(e);
              setLoginUser({ ...loginUser, userPassword: e.target.value });
            }}
            type="text"
            className="md:w-72 lg:w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-2 m-1 mt-3 justify-center">
          <div className="justify-start flex">
            <Button
              variant="outlined"
              style={{ width: "100%", height: "50%" }}
              className="bg-gray-800 text-white border-none rounded-lg text-xs"
              type="submit"
            >
              Sign In
            </Button>
          </div>
          <div className="justify-end flex">
            <Button
              variant="outlined"
              style={{ width: "100%", height: "50%" }}
              className="bg-gray-300 text-white border-none rounded-lg text-xs"
              onClick={() => console.log("Hello")}
            >
              Create New User
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginModal;
