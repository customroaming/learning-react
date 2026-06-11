"use client"
import { createContext, useContext, useState, ReactNode } from "react"
import { Todo, initialTodo } from "./data"

interface TodoContextType {
    todos: Todo[]
    addTodo: (todo: Todo) => void
}

const TodoContext = createContext<TodoContextType | null>(null)

export function TodoProvider({ children }: { children: ReactNode }) {
    const [todos, setTodos] = useState<Todo[]>(initialTodo)

    function addTodo(todo: Todo) {
        setTodos(prev => [...prev, todo])
    }

    return (
        <TodoContext.Provider value={{ todos, addTodo }}>
            {children}
        </TodoContext.Provider>
    )
}

export function useTodos() {
    const context = useContext(TodoContext)
    if (!context) throw new Error("useTodos must be used within a TodoProvider")
    return context
}
