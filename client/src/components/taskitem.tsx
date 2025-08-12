import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlineRadioButtonUnchecked } from "react-icons/md";
import { useState, useRef } from "react";
import { CiEdit } from "react-icons/ci";
import { eliminarTarea, updateTaskPartial } from "@/services/taskservice";
import { useRouter } from "next/navigation";
import { IoIosSave } from "react-icons/io";
import { motion } from "framer-motion";


type Props = {
  clave: string;
  titulo: string;
  done: boolean;
  onRecargar: () => Promise<void>;
};

export const Taskitem = ({ titulo, clave, done, onRecargar }: Props) => {
  const [flag, setFlag] = useState<boolean>(done);
  const [edit, setEdit] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const completar = async (): Promise<void> => {
    const nuevoEstado = !flag;
    setFlag(nuevoEstado);
    await updateTaskPartial(clave, { completed: nuevoEstado });
    await onRecargar();
  };

  const editar = async (): Promise<void> => {
    const nuevoEstado_e = !edit;
    setEdit(nuevoEstado_e);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(0, inputRef.current.value.length); // 👈 Selecciona todo
      }
    }, 0);
    //await updateTaskPartial(clave, { completed: nuevoEstado });
    await onRecargar();
  };

  const guardar = async (): Promise<void> => {
    const nuevoEstado_e = !edit;
    setEdit(nuevoEstado_e);
    const value = inputRef.current?.value;
    

    await updateTaskPartial(clave, { title: value });
    router.refresh();
  };

  const borrar = async (): Promise<void> => {
    await eliminarTarea(clave);
    await onRecargar();
    router.refresh();
  };

  return (

    <motion.div
      key={clave}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="shadow"
    >



    <div className="pt-4 flex items-center">
      <button
        className="bg-[#15508b] flex justify-center items-center rounded-l-2xl border-2 border-[#1b2936] h-10 w-10 transition-colors duration-300"
        onClick={completar}
      >
        {flag ? (
          <FaRegCheckCircle size={20} />
        ) : (
          <MdOutlineRadioButtonUnchecked size={20} />
        )}
      </button>

      <div className="relative w-80">
        <input
          type="text"
          defaultValue={titulo ?? ""}
          ref={inputRef}
          disabled={edit ? false : true}
          className={`border-2 h-10 w-80 border-[#1b2936] px-3 flex items-center ${
            flag ? "line-through" : "overline"
          }  `}
        />

        {edit &&
        <button
          onClick={guardar}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-blue-500 text-white h-10 w-10 flex justify-center items-center"
        ><IoIosSave size={20} /></button>}
      </div>

      <button
        onClick={editar}
        className="bg-[#098a32] border-2 border-[#1b2936] h-10 w-10 flex items-center justify-center active:scale-95 transition-transform duration-150"
      >
    
        <CiEdit size={20} />
      </button>

      <button
        onClick={borrar}
        className="bg-[#7a0e0e] border-2 rounded-r-2xl border-[#1b2936] h-10 w-10 flex items-center justify-center active:scale-95 transition-transform duration-150"
      >
      
        <FaRegTrashAlt size={20} />
      </button>
    </div>

      </motion.div>

  );
};
