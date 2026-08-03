import React from 'react'
import { Task } from '../types/task'
import TaskItem from './TaskItem'

type Props = {
  tasks: Task[]
  onToggle: (id: number) => void
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
}

export default function TaskList({ tasks, onToggle, onEdit, onDelete }: Props) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} />
      ))}
    </div>
  )
}
