"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { loginUser } from "@/services/Userservices";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store/store";
import { useRouter } from "next/navigation";

type FormData = {
  email: string;
  password: string;
};

export default function Login () {
  const { register, handleSubmit } = useForm<FormData>();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const onSubmit = handleSubmit((data) => {
   
    loginUser(data, dispatch);
    router.push("/");
  });

  return (
    <div className="flex justify-center items-center min-h-screen mx-4 mt-10 ">
      <div className="h-140 w-100 border  border-[#202b38] p-2 rounded-3xl bg-[radial-gradient(circle_at_center,_#041424,_#051320,_#080d13)] hover:border-[#677483] transition-colors duration-800">
        <h1 className=" text-white text-4xl pl-4 mt-12">Sing in</h1>



        <div className="text-[#8092a1] flex flex-col p-4 pt-10">
          <form onSubmit={onSubmit} className="w-full">
            <label className="flex flex-col mb-4">
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
                className="text-white h-10 border-[#202b38] border-1 rounded-md p-2
                focus:outline-none focus:ring-2
             focus:ring-[#15508b] focus:shadow-[0_0_0_4px_#4a76e9]
                hover:border-[#677483] transition-colors duration-200"
                type="password"
                placeholder="Input Password"
                required
                {...register("password")}
              />
            </label>

            <div className="flex justify-center mt-10">
              <button
                type="submit"
                className="bg-white w-[120px] rounded-md mt-4 h-10 mx-auto text-black font-semibold active:scale-95
             transition-colors duration-300 ease-in-out hover:bg-[#677483] "
              >
                Login
              </button>

             
            </div>

             <label className="mt-20 ">
                <h1 className="mt-20 flex flex-warp gap-2 text-sm ">
                  Dont have an account?{" "}
                  <Link href="/signup">
                    {" "}
                    <h1 className="font-extrabold text-[#15508b]">Sign Up</h1>
                  </Link>{" "}
                </h1>
              </label>
          </form>
        </div>
      </div>
    </div>
  );
};
