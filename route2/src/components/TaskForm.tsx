import React, { useEffect, useState } from 'react'
import { Task } from '../types/task'

type Props = {
  open: boolean
  initial?: Partial<Task>
  onClose: () => void
  onSubmit: (data: { subject: string; book: string; range: string; icon: string }) => void
}

export default function TaskForm({ open, initial, onClose, onSubmit }: Props) {
  const [subject, setSubject] = useState(initial?.subject ?? '')
  const [book, setBook] = useState(initial?.book ?? '')
  const [range, setRange] = useState(initial?.range ?? '')
  const [icon, setIcon] = useState(initial?.icon ?? '📚')

  useEffect(() => {
    if (open) {
      setSubject(initial?.subject ?? '')
      setBook(initial?.book ?? '')
      setRange(initial?.range ?? '')
      setIcon(initial?.icon ?? '📚')
    }
  }, [open, initial])

  if (!open) return null

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{initial ? 'タスクを編集' : '参考書を追加'}</h2>

        <input type="text" placeholder="教科（例：数学）" value={subject} onChange={(e) => setSubject(e.target.value)} />
        <input type="text" placeholder="参考書名" value={book} onChange={(e) => setBook(e.target.value)} />
        <input type="text" placeholder="範囲" value={range} onChange={(e) => setRange(e.target.value)} />

        <div className="modal-actions">
          <button type="button" className="secondary-button" onClick={onClose}>
            キャンセル
          </button>

          <button
            type="button"
            className="primary-button"
            onClick={() => onSubmit({ subject: subject.trim(), book: book.trim(), range: range.trim(), icon })}
          >
            {initial ? '更新する' : '追加する'}
          </button>
        </div>
      </div>
    </div>
  )
}
