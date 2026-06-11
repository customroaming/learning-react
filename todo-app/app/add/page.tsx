"use client"
import { useState } from "react"
import { useTodos } from "@/lib/todo-context";
import { Todo } from "@/lib/data";
import { useRouter } from "next/navigation"

export default function AddTodoPage() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState<"food" | "other">("food")
    const { addTodo } = useTodos()
    const router = useRouter();

    function handleAdd() {
        if (title == "") {
            return
        }
        const id = Date.now();
        const newTodoItem: Todo = {
            id: id,
            title: title,
            category: category
        }
        addTodo(newTodoItem);
        router.push("/")
    }

    return (
        <form className="flex flex-col gap-4 lg:flex-row">
            <input className="p-4 border-b-2 border-gray-400 mx-w-sm" placeholder="name" value={title} onChange={(e) => setTitle(e.target.value)} />
            <select value={category} className="p-4 rounded-lg mx-w-sm" onChange={(e) => setCategory(e.target.value as "food" | "other")}>
                <option value="food">food</option>
                <option value="other">other</option>
            </select>
            <button className="py-3 px-10 w-fit hover:bg-fuchsia-700 transition-all cursor-pointer bg-fuchsia-900 text-white rounded-full font-bold active:scale-95" onClick={(e) => {
                e.preventDefault()
                handleAdd()
            }}>add todo</button>
        </form>
    );
}
