export async function obtenerTareas() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
  if (!res.ok) throw new Error("Error al obtener tareas");
  return res.json();
}


export async function createTask(taskData: { title: string, username: string }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...taskData,
        description: "taskNew Testing",
        completed: false
      }),
    });

    if (!res.ok) throw new Error("Error al crear la tarea");

    const data = await res.json();
    
    return data;
  } catch (error) {
    console.error("Error en el POST:", error);
  }
}


export async function eliminarTarea(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error('Error al eliminar tarea');

  return ; 
}


export async function updateTaskPartial(id: string, updates: { title?: string; description?: string; completed?: boolean }) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    if (!res.ok) {
      throw new Error(`Error al actualizar parcialmente la tarea: ${res.status}`);
    }
    return ;
  }
  catch (error) {
    console.error("Error en el POST:", error);
  }

}