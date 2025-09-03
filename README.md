<h1>Project Description – Todo App</h1>

<p>This project is a Todo List application built with React and TypeScript, designed to provide users with a simple yet powerful way to manage daily tasks</p>

<h3>Key Features</h3>

<ul>
  <li>Task Management: Add, edit, mark as completed, and delete todos.</li>
  <li>Uses localStorage to store todos locally so that tasks remain saved between browser sessions.</li>
  <li>Uses cookies, ensuring each user has their own personal task list without needing registration</li>
  <li>Uses Redux toolikt to handle task state updates and synchronization with storage</li>
</ul>

<h3>Technologies Used</h3>

<ul>
  <li>React</li>
  <li>TypeScript</li>
  <li>Redux</li>
  <li>localStorage x Cookies</li>
</ul>


<h3>How It Works</h3>

When a new user visits the app, a unique cookie-based ID is generated.

A storage key (list_<user_id>) is created in localStorage to save that user’s tasks.

All task operations (add, mark done, unmark, clear completed) are synchronized to localStorage in real time.

On returning to the app, the user’s cookie ensures their personal todo list is retrieved automatically.
