"use client";

import { Taskitem } from "@/components/taskitem";
import { Tasknew } from "@/components/tasknew";
import { useEffect, useState, useCallback } from "react";
import { obtenerTareas } from "@/services/taskservice";
import { useSelector,useDispatch } from "react-redux";
import { RootState } from "../app/store/store";
import { AnimatePresence } from "framer-motion";
import LoadingModal from "@/components/Loadingpage";
import { setLoading } from "@/app/features/UI/uiSlice";


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
  const dispatch = useDispatch();


const fechtDatos = useCallback(async () => {
  try {
    dispatch(setLoading(true));
    const data: Tarea[] = await obtenerTareas();
    setDatos([...data]);
  } catch (err) {
    alert("Error al conectar a BD");
    console.error(err);
  } finally {
    dispatch(setLoading(false));
  }
}, [dispatch]);



  useEffect(() => {
    fechtDatos();
  }, [fechtDatos]);

  return (
    <div className="text-white flex flex-col max-h-[calc(100vh_-_1rem)] max-w-full content-center overflow-hidden mb-4 mt-20 sm:mt-30 mx-2">
      <div className="flex flex-col items-center h-140 sm:h-180 self-center flex-grow overflow-y-auto pb-2 mb-2 pt-5 sm:pt-10 px-4 w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl bg-[radial-gradient(circle_at_center,_#041424,_#051320,_#080d13)] border-2 border-[#1b2936] rounded-3xl hover:border-[#677483] transition-colors duration-200">
        <h1 className=" text-2xl sm:text-3xl">
          Task List: <span className="font-bold"> {user}</span>
        </h1>
       
        <Tasknew onRecargar={fechtDatos} />

        <div className="relative w-full min-h-[300px] ">
          
          {useSelector((state: RootState) => state.ui.loading) && <LoadingModal />}
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
