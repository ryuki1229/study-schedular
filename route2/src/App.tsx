import { useState } from 'react'
import './App.css'

type StudyTask = {
  id: number
  subject: string
  book: string
  range: string
  icon: string
  completed: boolean
}

const initialTasks: StudyTask[] = [
  {
    id: 1,
    subject: '数学',
    book: '基礎問題精講',
    range: '34〜41ページ',
    icon: '📐',
    completed: true,
  },
  {
    id: 2,
    subject: '英語',
    book: 'システム英単語',
    range: '120〜140語',
    icon: '📘',
    completed: true,
  },
  {
    id: 3,
    subject: '化学',
    book: '理論化学の講義',
    range: '第3章',
    icon: '🧪',
    completed: false,
  },
]

function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [isAddBookOpen, setIsAddBookOpen] = useState(false)

  const [newTask, setNewTask] = useState({
    subject: '',
    book: '',
    range: '',
    icon: '📚',
  })

  const completedCount = tasks.filter((task) => task.completed).length

  const achievementRate =
    tasks.length === 0
      ? 0
      : Math.round((completedCount / tasks.length) * 100)

  const toggleTask = (taskId: number) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task,
      ),
    )
  }

  const addTask = () => {
    if (
      newTask.subject.trim() === '' ||
      newTask.book.trim() === '' ||
      newTask.range.trim() === ''
    ) {
      alert('教科・参考書名・範囲を全部入力してね')
      return
    }

    const taskToAdd: StudyTask = {
      id: Date.now(),
      subject: newTask.subject.trim(),
      book: newTask.book.trim(),
      range: newTask.range.trim(),
      icon: newTask.icon,
      completed: false,
    }

    setTasks((currentTasks) => [...currentTasks, taskToAdd])

    setNewTask({
      subject: '',
      book: '',
      range: '',
      icon: '📚',
    })

    setIsAddBookOpen(false)
  }

  return (
    <main className="app">
      <div className="background-shape shape-one" />
      <div className="background-shape shape-two" />

      <div className="container">
        <header className="header">
          <div>
            <p className="eyebrow">STUDY MANAGEMENT</p>
            <h1>Route</h1>
            <p className="greeting">
              おかえり。今日もルートを一歩進めよう。
            </p>
          </div>

          <button className="profile-button" type="button">
            R
          </button>
        </header>

        <section className="hero-card">
          <div>
            <p className="card-label">今日の達成率</p>
            <p className="achievement-number">
              {achievementRate}
              <span>%</span>
            </p>
          </div>

          <div className="progress-area">
            <div className="progress-text">
              <span>
                {completedCount} / {tasks.length} 完了
              </span>
              <span>あと{tasks.length - completedCount}件</span>
            </div>

            <div className="progress-track">
              <div
                className="progress-bar"
                style={{ width: `${achievementRate}%` }}
              />
            </div>
          </div>
        </section>

        <section className="section">
          <div className="section-heading">
            <div>
              <p className="card-label">TODAY</p>
              <h2>今日の予定</h2>
            </div>

            <button className="text-button" type="button">
              すべて見る
            </button>
          </div>

          <div className="task-list">
            {tasks.map((task) => (
              <article
                className={`task-card ${
                  task.completed ? 'task-completed' : ''
                }`}
                key={task.id}
              >
                <div className="task-icon">{task.icon}</div>

                <div className="task-content">
                  <p className="task-subject">{task.subject}</p>
                  <h3>{task.book}</h3>
                  <p>{task.range}</p>
                </div>

                <button
                  className="check-button"
                  type="button"
                  onClick={() => toggleTask(task.id)}
                  aria-label={`${task.book}の完了状態を変更`}
                >
                  {task.completed ? '✓' : ''}
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="summary-grid">
          <article className="summary-card">
            <div className="summary-icon">🏁</div>
            <p className="card-label">終了見込み</p>
            <h3>10月18日</h3>
            <p className="summary-note">現在のペースで計算</p>
          </article>

          <article className="summary-card">
            <div className="summary-icon">🎯</div>
            <p className="card-label">目標まで</p>
            <h3>112日</h3>
            <p className="summary-note">予定より4日早い</p>
          </article>
        </section>

        <button
          className="add-book-button"
          type="button"
          onClick={() => setIsAddBookOpen(true)}
        >
          <span>＋</span>
          参考書を追加
        </button>

        <nav className="bottom-navigation">
          <button className="nav-item active" type="button">
            <span>⌂</span>
            ホーム
          </button>

          <button className="nav-item" type="button">
            <span>▣</span>
            参考書
          </button>

          <button className="nav-item" type="button">
            <span>□</span>
            カレンダー
          </button>

          <button className="nav-item" type="button">
            <span>✦</span>
            AI相談
          </button>
        </nav>
      </div>

      {isAddBookOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>参考書を追加</h2>

            <input
              type="text"
              placeholder="教科（例：数学）"
              value={newTask.subject}
              onChange={(event) =>
                setNewTask({
                  ...newTask,
                  subject: event.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="参考書名"
              value={newTask.book}
              onChange={(event) =>
                setNewTask({
                  ...newTask,
                  book: event.target.value,
                })
              }
            />

            <input
              type="text"
              placeholder="範囲"
              value={newTask.range}
              onChange={(event) =>
                setNewTask({
                  ...newTask,
                  range: event.target.value,
                })
              }
            />

            <div className="modal-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => setIsAddBookOpen(false)}
              >
                キャンセル
              </button>

              <button
                type="button"
                className="primary-button"
                onClick={addTask}
              >
                追加する
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default App