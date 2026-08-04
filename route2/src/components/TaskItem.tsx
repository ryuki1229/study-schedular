import type { Task } from '../types/task'

type Props = {
  task: Task
  onToggle: (id: number) => void
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
}

export default function TaskItem({ task, onToggle, onEdit, onDelete }: Props) {
  return (
    <article className={`task-card ${task.completed ? 'task-completed' : ''}`}> 
      <div className="task-icon">{task.icon}</div>

      <div className="task-content">
        <p className="task-subject">{task.subject}</p>
        <h3>{task.book}</h3>
        <p>{task.range}</p>
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button
          className="check-button"
          type="button"
          onClick={() => onToggle(task.id)}
          aria-label={`${task.book}の完了状態を変更`}
        >
          {task.completed ? '✓' : ''}
        </button>

        <button className="text-button" type="button" onClick={() => onEdit(task)}>
          編集
        </button>

        <button className="text-button" type="button" onClick={() => onDelete(task.id)}>
          削除
        </button>
      </div>
    </article>
  )
}
