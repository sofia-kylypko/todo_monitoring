import './styles/App.scss'
import plusIcon from './assets/plus.png'
import arrowIcon from './assets/arrow.png'
import { useAppDispatch, useAppSelector } from './app/hooks.ts'
import { toggleSection } from './app/elements/toggle.ts'
import { addTask, markTaskDone, markTaskTodo, clearCompletedTasks } from './app/elements/list.ts'


function App() {
  console.log("render")

  const dispatch = useAppDispatch()
  const { rotation, visible } = useAppSelector((state) => state.toggle)
  const taskList = useAppSelector((state) => state.list)

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const taskText = formData.get('input') as string
    if (taskText) {
      dispatch(addTask(taskText))
      e.currentTarget.reset()
    } else {
      alert('Needed text for new task')
    }
  }

  // todo tasks objects
  const todoTasks = taskList.filter(el => !el.completed).map(el => (
    <div className='todoTaskItem' key={el.id}>
      <input
        type="checkbox"
        onChange={() => dispatch(markTaskDone(el.id))}
      />
      <div>
        <div>{el.desc}</div>
        <div>{new Date(el.date).getDate()}/{new Date(el.date).getMonth() + 1}/{new Date(el.date).getFullYear()}</div>
      </div>
    </div>
  ))

  // done tasks objects
  const doneTasks = taskList.filter(el => el.completed).map(el => (
    <div className='doneTaskItem' key={el.id}>
      <input
        type="checkbox"
        defaultChecked
        onChange={() => dispatch(markTaskTodo(el.id))}
      />
      <div>
        <div>{el.desc}</div>
        <div>{new Date(el.date).getDate()}/{new Date(el.date).getMonth() + 1}/{new Date(el.date).getFullYear()}</div>
      </div>
    </div>
  ))

  return (
    <>
      <header>
        <h1>Good afternoon!</h1>
      </header>

      <main>
        <section className="addNew">
          <form onSubmit={handleAddTask}>
            <input name='input' type='text' placeholder='Add a new task...'></input>
            <button>
              <img src={plusIcon} alt='icon' />
              <span>Add</span>
            </button>
          </form>
        </section>

        <section>
          <h2>Active tasks</h2>
          <div className='taskGrid'>
            {todoTasks}
          </div>
        </section>

        <section className="completed">
          <div className='heading'>
            <h2>Recently completed tasks</h2>
            <div>
              <button onClick={() => dispatch(clearCompletedTasks())}>Clear all</button>
              <button onClick={() => dispatch(toggleSection())}>
                <img
                  src={arrowIcon}
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: 'transform 0.3s ease',
                  }}
                />
              </button>
            </div>
          </div>

          {/* only show if visible */}
          {visible && (
            <div className="closingSection taskGrid">
              {doneTasks}
            </div>
          )}
        </section>
      </main>
    </>
  )
}

export default App