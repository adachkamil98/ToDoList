{

    let tasks = [];
    let hideDoneTasks = false // kliknięcie w przycisk miałoby przełączać wartość tej zmiennej z false na true

    const addNewTask = (newTask) => {
        tasks = [
            ...tasks,
            { content: newTask, done: false }
        ];

        /* stary kod
        tasks.unshift(
            {
                content: newTask,
            }
        );
*/
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
        /*stary kod
       tasks.splice(taskIndex, 1);
       */
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
        ]

        // niezgodne z immutability
        //tasks[taskIndex].done = !tasks[taskIndex].done;

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
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
        <li class="list list__item">
            <button class= "js-done list__toggleStatusButton">
                ${task.done ? "✔" : ""}
            </button>
            <span class= "list ${task.done ? "list__taskDone" : "list"}">
                ${task.content}
            </span>
            <button class="js-remove list__clearButton">🗑️</button>
        </li>
    `;
        };

        document.querySelector(".js-tasksList").innerHTML = htmlString;
    };

    const renderButtons = () => { };

    const bindButtonsEvents = () => { }; // przypiąc listener do przycisku ukończ zadania

    const render = () => {

        renderTasks();
        renderButtons();

        bindRemoveEvents();
        bindToggleTaskDone();
        bindButtonsEvents();// przypiąc listener do przycisku ukończ zadania
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