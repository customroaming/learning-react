"use client";
import { useTodos } from "@/lib/todo-context";

export default function TodoList() {
  const { todos, removeTodo } = useTodos();
  function getTodo() {
    return todos.map((todo, index) => {
      return (
        <div key={todo.id} className=" flex flex-col max-w-48">
          <div className="flex flex-row justify-between items-center">
            <div className="todo-item flex flex-col ">
              <h4 className="font-bold font-sans text-lg">{todo.title}</h4>
              <p>{todo.category}</p>
            </div>
            <button
              onClick={() => removeTodo(todo.id)}
              className="font-bold text-red-600  cursor-pointer w-10 h-10 rounded-full hover:bg-neutral-900 hover:text-red-300 transition-all"
            >
              X
            </button>
          </div>
          {index === todos.length - 1 ? (
            <></>
          ) : (
            <hr className="text-gray-800 my-2" />
          )}
        </div>
      );
    });
  }

  return (
    <>
      <div className="content flex flex-col gap-8">
        <div className="todo-list">{getTodo()}</div>
      </div>
    </>
  );
}
