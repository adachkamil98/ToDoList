
const welcome = () => {
    console.log("Hello World!")
};

{

    const tasks = [
        {
            content: "pouczyć się JS",
            done: false,
        },
        {
            content: "umyć zęby",
            done: true,
        },
    ];

    const addNewTask = (newTask) => {
        tasks.unshift(
            {
                content: newTask,
            }
        );

        render();
    };

    const clearInput = () => {
        document.querySelector(".js-newTaskContent").value = "";
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;

        render();
    };

    const bindEvents = () => {

        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item">
            <button class= "js-done list__button"> ${task.done ? "✔" : ""}</button>
            <span class= "${task.done ? "list__taskDone" : ""}">
            ${task.content}
            </span>
            <button class="js-remove list__clearButton">🗑️</button>
            </li>
        `;
        };

        document.querySelector(".js-tasksList").innerHTML = htmlString;

        bindEvents();

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