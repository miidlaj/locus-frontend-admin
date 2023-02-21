import React from "react";
import { useEffect, useState } from "react";
import "./LoginPage.css";
import LoginSvg from "../../component/login/loginSvg";
import logo from "../../assests/oie_fCAaxhclGNkh.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LoginButton from "../../component/login/LoginButton";
import AuthenticationService from "../../services/authentication.service";
import AlertBox from "../../component/common/AlertBox";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import User from "../../model/User";
import { setCurrentUser } from "../../store/actions/user";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux/es/exports";

function LoginPage() {


  const [user, setUser] = useState(new User("", ""));
  const [errorMessage, setErrorMessage] = useState("");
  const [successRegister, setSuccessRegister] = useState("");

  const { state } = useLocation();

  const dispatch: AppDispatch = useDispatch();



  const navigate = useNavigate();

  const formSchema = z.object({
    email: z.string().email("Invalid email").min(1, "Email is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(8, "Password must have more than 8 characters"),
  });

  type FormSchemaType = z.infer<typeof formSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
  });

  
  useEffect(() => {
    if (state?.success) {
      setSuccessRegister(state?.message);
    } else if (state?.success === false) {
      setErrorMessage(state?.message);
    }

  }, []);

  const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
    setSuccessRegister("");
    user.email = data.email;
    user.password = data.password;

    AuthenticationService.login(user)
      .then((response) => {
        dispatch(setCurrentUser(response.data));
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        if (error?.response?.status === 423) {
          setErrorMessage("Bad Credintials");
        } else if (error?.response?.status === 406){
          setErrorMessage("Your Account is disabled!");
        } else {
          setErrorMessage("Unexpected error occurred.");
        }
      });
  };

  return (
    <div className="lg:flex">
      <div className="lg:w-1/2 xl:max-w-screen-md">
        <div className="pt-12 bg-gray-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
          <div className="cursor-pointer flex items-center">
            <div>
              <img src={logo} alt="" />
            </div>
            <div className="text-2xl text-teal-900 tracking-wide ml-2 font-semibold">
              Locus Haunt
            </div>
          </div>
        </div>
        <div className="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl">
          {successRegister && (
            <AlertBox message={successRegister} heading="Registered!" />
          )}
          {errorMessage && <AlertBox message={errorMessage} heading="Oops!" />}
          <h2
            className="pt-6 text-center text-4xl text-teal-900 font-display font-semibold lg:text-left xl:text-5xl
              xl:text-bold"
          >
            Log in
          </h2>
          <div className="mt-12">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className="text-sm font-bold text-gray-700 tracking-wide">
                  Email Address
                </div>
                <input
                  className={
                    "w-full text-lg py-2 border-b border-gray-300 focus:outline-none " +
                    (errors.email
                      ? "focus:border-red-700"
                      : "focus:border-teal-900")
                  }
                  type="email"
                  placeholder="admin@gmail.com"
                  {...register("email")}
                />
                {errors.email && (
                  <span className="text-red-700 text-sm block mt-2">
                    {errors.email?.message}
                  </span>
                )}
              </div>
              <div className="mt-8">
                <div className="flex justify-between items-center">
                  <div className="text-sm font-bold text-gray-700 tracking-wide">
                    Password
                  </div>
                  <div>
                    <Link
                      to="/forgot-password"
                      className="text-xs font-display font-semibold text-teal-900 hover:text-gray-500 cursor-pointer"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <input
                  className={
                    "w-full text-lg py-2 border-b border-gray-300 focus:outline-none " +
                    (errors.password
                      ? "focus:border-red-700"
                      : "focus:border-teal-900")
                  }
                  type="password"
                  placeholder="Enter your password"
                  {...register("password")}
                />
                {errors.password && (
                  <span className="text-red-700 text-sm block mt-2">
                    {errors.password?.message}
                  </span>
                )}
              </div>
              <div className="mt-10">
                <LoginButton Label="Sign In" disbaled={isSubmitting} />
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex items-center justify-center bg-white flex-1 h-screen">
        <div className="max-w-xs transform duration-200 hover:scale-110 cursor-pointer">
          <LoginSvg />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
