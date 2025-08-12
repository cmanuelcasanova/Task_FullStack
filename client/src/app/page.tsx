"use client";

import { Taskitem } from "@/components/taskitem";
import { Tasknew } from "@/components/tasknew";
import { useEffect, useState } from "react";
import { obtenerTareas } from "@/services/taskservice";
import { useSelector } from "react-redux";
import { RootState } from "../app/store/store";
import { AnimatePresence } from "framer-motion";
import LoadingModal from "@/components/Loadingpage";

type Tarea = {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  username: string;
};

export default function Home() {
  const user = useSelector((state: RootState) => state.user.user);
  const [datos, setDatos] = useState<Tarea[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fechtDatos = async () => {
    try {
      

      const data: Tarea[] = await obtenerTareas();
      setDatos([...data]);
    } catch (err) {
      alert("Error al conectar a BD");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fechtDatos();
  }, []);

  return (
    <div className="text-white flex flex-col max-w-full content-center mt-10 sm:mt-20 m-4 ">
      <div className="  flex flex-col items-center self-center overflow-y-auto mt-10 pt-5 sm:pt-10 max-h-[700px] h-auto min-h-[700px] w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-[radial-gradient(circle_at_center,_#041424,_#051320,_#080d13)] border-2 border-[#1b2936] rounded-3xl hover:border-[#677483] transition-colors duration-200">
        <h1 className=" text-2xl sm:text-3xl">
          Task List: <span className="font-bold"> {user}</span>
        </h1>
       
        <Tasknew onRecargar={fechtDatos} />

        <div className="relative w-full min-h-[300px] ">
          
          {isLoading && <LoadingModal />}
          <ul className="mt-1 sm:mt-6 mx-2 sm:mx-6 flex flex-col items-center justify-center">
            <AnimatePresence>
              {datos
                .filter((tarea) => tarea.username === user)
                .map((tarea) => (
                  <Taskitem
                    key={tarea._id}
                    titulo={tarea.title}
                    clave={tarea._id}
                    done={tarea.completed}
                    onRecargar={fechtDatos}
                  />
                ))}
            </AnimatePresence>
          </ul>
        </div>
      </div>
    </div>
  );
}
