export interface todoType {
    id: number;
    userId: number;
    name: string;
    shortDescription: string;
    dateTime: string;
    isDone: boolean;
    createdAt: string;
}

export interface addNewTodo {
    todoId: number;
}

export interface queryTodos {
    status?: string;
    referenceDateTime?: Date;
    orderBy?: string;
}