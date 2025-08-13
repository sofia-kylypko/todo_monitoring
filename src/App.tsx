import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './styles/App.scss'
// import library from './components/library'
import plusIcon from './assets/plus.png'
import arrowIcon from './assets/arrow.png'
import type { Todo } from './types/Todo.ts'

const initTodos: Todo[] = [
  { id: 1, desc: 'Buy milk', completed: false, date: new Date('2004-10-12') },
  { id: 2, desc: 'Buy water', completed: true, date: new Date('2004-10-12') }
];

function App() {
  console.log("render")

  const [state, setState] = useState({ rotation: 0, visible: true });
  const [taskList, setTaskList] = useState<Todo[]>(initTodos);

  const doneTasks = taskList.filter(el => el.completed).map(el => (
    <div className='doneTaskItem' key={el.id}>
      <input
        type="checkbox"
        defaultChecked
        onChange={() => markTaskTodo(el.id)}
      />
      <div>
        <div>{el.desc}</div>
        <div>{el.date.toString()}</div>
      </div>
    </div>
  ))

  const todoTasks = taskList.filter(el => !el.completed).map(el => (
    <div className='todoTaskItem' key={el.id}>
      <input
        type="checkbox"
        onChange={() => markTaskDone(el.id)}
      />
      <div>
        <div>{el.desc}</div>
        <div>{el.date.toString()}</div>
      </div>
    </div>
  ))

  const toggleSection = () => {
    setState((prev) => ({
      rotation: prev.rotation + 180,
      visible: !prev.visible
    }));
  };

  const addTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const taskText = formData.get("input") as string;

    console.log(taskText);

    if (taskText) {
      const newTodo: Todo = {
        id: Date.now(),
        desc: taskText,
        completed: false,
        date: new Date()
      };
      console.log(newTodo);

      setTaskList(prevList => [...prevList, newTodo]);

      e.currentTarget.reset();
    } else {
      alert("Needed text for new task")
    }
  }

  const markTaskDone = (taskId: number) => {
    setTaskList(prevList => prevList.map(el =>
      el.id === taskId ? { ...el, completed: true } : el
    ));
  };

  const markTaskTodo = (taskId: number) => {
    setTaskList(prevList => prevList.map(el =>
      el.id === taskId ? { ...el, completed: false } : el
    ));
  };

  const clearCompletedTasks = () => {
    setTaskList(prevList => prevList.filter(el => !el.completed));
  }

  return (
    <>
      <header>
        <h1>Good afternoon!</h1>
      </header>

      <main>
        <section className="addNew">
          <form onSubmit={addTask}>
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
              <button onClick={clearCompletedTasks}>Clear all</button>
              <button><img src={arrowIcon} onClick={toggleSection} style={{
                transform: `rotate(${state.rotation}deg)`,
                transition: "transform 0.3s ease"
              }} /></button>
            </div>

          </div>
          <div className={`closingSection taskGrid ${state.visible ? "show" : "hide"}`}>
            {doneTasks}
          </div>
        </section>
      </main>
    </>
  )
}

export default App
