"use client";


import { useForm } from "react-hook-form";
import { registerUser } from "@/services/Userservices";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
  username: string;
  agreeTerms: boolean;
};

export const Signup = () => {
  const { register, handleSubmit } = useForm<FormData>();
    const router = useRouter();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    registerUser(data);
    router.push("/login");
  });

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="h-140 w-100 border  border-[#202b38] p-4 bg-[radial-gradient(circle_at_center,_#041424,_#051320,_#080d13)] hover:border-[#677483] transition-colors duration-800">
        <h1 className=" text-white text-4xl pl-4 mt-12">Sing up</h1>

        <div className="text-[#8092a1] flex flex-col p-4 pt-10">
          <form onSubmit={onSubmit} className="w-full">
            <label className="flex flex-col mb-4">
              Username
              <input
                className="text-white h-10  border-[#202b38] border-1 rounded-md p-2
                focus:outline-none focus:ring-2
             focus:ring-[#15508b] focus:shadow-[0_0_0_4px_#4a76e9]
                hover:border-[#677483] transition-colors duration-200"
                type="text"
                placeholder="input Email"
                required
                {...register("username")}
              />
            </label>

            <label className="flex flex-col  mb-4">
              Email
              <input
                className="text-white h-10  border-[#202b38] border-1 rounded-md p-2
                focus:outline-none focus:ring-2
             focus:ring-[#15508b] focus:shadow-[0_0_0_4px_#4a76e9]
                hover:border-[#677483] transition-colors duration-200"
                type="text"
                placeholder="input Email"
                required
                {...register("email")}
              />
            </label>

            <label className="flex flex-col mb-4">
              Password
              <input
                className="text-white h-10  border-[#202b38] border-1 rounded-md p-2
                focus:outline-none focus:ring-2
             focus:ring-[#15508b] focus:shadow-[0_0_0_4px_#4a76e9]
                hover:border-[#677483] transition-colors duration-200"
                type="password"
                placeholder="Input Password"
                required
                {...register("password")}
              />
            </label>

            <label className="flex items-center gap-2 mt-6">
              <div className="relative w-5 h-5">
                <input
                  type="checkbox"
                  {...register("agreeTerms")}
                  required
                  className="peer appearance-none w-full h-full bg-[#05080d] border border-[#202b38] rounded checked:bg-[#2d63bd] transition-colors hover:border-[#677483] duration-200"
                />
                <span className="absolute inset-0 flex items-center justify-center pointer-events-none peer-checked:opacity-100 opacity-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3.5 h-3.5 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </div>
              <span className="text-white">I agree Terms & conditions</span>
            </label>

            <div className="flex justify-center mt-10">
              <button
                type="submit"
                className="bg-white w-[120px] rounded-md mt-4 h-10 mx-auto text-black font-semibold active:scale-95
                 transition-colors duration-300 ease-in-out hover:bg-[#677483] cursor-pointer"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
