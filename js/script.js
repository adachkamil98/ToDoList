{

    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTask) => {
        tasks = [
            ...tasks,
            { content: newTask}
        ];
        render();
    };

    const clearInput = () => {
        document.querySelector(".js-newTaskContent").value = "";
    };

    const removeTask = (taskIndex) => {

        tasks = [
            ...tasks.slice(0, taskIndex),
            ...tasks.slice(taskIndex + 1)
        ];
        render();
    };

    const toggleTaskDone = (taskIndex) => {

        tasks = [
            ...tasks.slice(0, taskIndex),
            {
                ...tasks[taskIndex],
                done: !tasks[taskIndex].done,
            },
            ...tasks.slice(taskIndex + 1)
        ];
        render();
    };

    const markAllTasksAsDone = () => {
        tasks = tasks.map((task) => ({
            ...task, done: true,
        }));

        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;

        render();
    };

    const bindRemoveEvents = () => {

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleTaskDone = () => {

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const renderTasks = () => {
        const taskToHTML = task => `
                <li class="list list__item ${task.done && hideDoneTasks ? "list__item--hidden" : ""} js-tasksList">
                    <button class= "js-done list__toggleStatusButton">
                        ${task.done ? "✔" : ""}
                    </button>
                    <span class= "list ${task.done ? "list__taskDone" : "list"}">
                        ${task.content}
                    </span>
                    <button class="js-remove list__clearButton">
                    🗑️
                    </button>
                </li>
            `;
        const tasksElement = document.querySelector(".js-tasksList");
        tasksElement.innerHTML = tasks.map(taskToHTML).join("");
    };

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if(!tasks.length){
            buttonsElement.innerHTML = "";
            return;
        }

        buttonsElement.innerHTML = `
            <button class="buttons__button js-toggleHideDoneTasks">
            ${hideDoneTasks===true ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button 
            class="buttons__button js-markAllTasksAsDone"
            ${ tasks.every(({done}) => done) ? " disabled" : ""}
            >
            Ukończ wszystkie
            </button>
        `;
        
    };

    const bindButtonsEvents = () => {
        const hideDoneTasksButton = document.querySelector(".js-toggleHideDoneTasks");
        if (hideDoneTasksButton) { hideDoneTasksButton.addEventListener("click", toggleHideDoneTasks) };

        const markAllTasksAsDoneButton = document.querySelector(".js-markAllTasksAsDone");
        if (markAllTasksAsDoneButton) { markAllTasksAsDoneButton.addEventListener("click", markAllTasksAsDone) };
    };

    const render = () => {
        renderTasks();
        bindRemoveEvents();
        bindToggleTaskDone();

        renderButtons();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTaskContent").value.trim();

        if (newTask === "") {
            return;
        }

        addNewTask(newTask);

        clearInput();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();

}