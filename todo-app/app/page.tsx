"use client"
import { useTodos } from "@/lib/todo-context"

export default function TodoList() {
    const { todos } = useTodos()
    function getTodo() {
        return todos.map((todo, index) => {
            return (
                <div key={todo.id} className="todo-item flex flex-col max-w-48">
                    <h4 className="font-bold font-sans text-lg">{todo.title}</h4>
                    <p>{todo.category}</p>
                    {index === todos.length - 1 ? <></> : <hr className="text-gray-800 my-2" />}
                </div>
            );
        })
    }
    return (
        <>
            <div className="content flex flex-col gap-8">
                <div className="todo-list">
                    {getTodo()}
                </div>
            </div >
        </>
    );
}
