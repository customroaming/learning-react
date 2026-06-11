// lib/data.ts
export interface Todo {
    id: number
    title: string
    category: "food" | "other"
}

export const initialTodo: Todo[] = [
    { id: 1, title: "apple", category: "food" },
    { id: 2, title: "tofu", category: "food" },
    { id: 3, title: "clothes", category: "other" },
]
