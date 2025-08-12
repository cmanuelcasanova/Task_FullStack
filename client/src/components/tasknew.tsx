import { useRouter } from "next/navigation";
import { MdNoteAdd } from "react-icons/md";
import { createTask } from "@/services/taskservice";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { RootState } from "../app/store/store";

type Props = {
  onRecargar: () => void;
};

export const Tasknew: React.FC<Props> = ({ onRecargar }) => {
  const user = useSelector((state: RootState) => state.user.user);
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm();

  const fetchPost = async (title: string, username: string) => {
    if (title !== "") {
      try {
        const data = await createTask({ title, username });
        await onRecargar();
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Debe escribir una tarea");
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    await fetchPost(data.title, user);

    router.refresh();
    reset();
  });

  return (
    <div className="pt-4 mb-5 flex items-center ">
      <form className="flex flex-wrap" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Input New Task"
          {...register("title")}
          className="border-2 h-15 w-100 border-[#1b2936] rounded-l-2xl px-3 text-m hover:border-[#677483] transition-colors duration-200"
        />

        <button
          className="bg-[#15508b] flex justify-center border-2 rounded-r-2xl border-[#1b2936] h-15 w-10 items-center hover:bg-blue-700 active:scale-95 transition-transform duration-150"
          type="submit"
        >
          {" "}
          <MdNoteAdd size={30} />
        </button>
      </form>
    </div>
  );
};
