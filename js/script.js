
const welcome = () => {
    console.log("Hello World!")
};

{

    const tasks = [
        {
            content: "umyć naczynia",
            done: false,
        },
        {
            content: "odkurzyć",
            done: true,
        },
    ];

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;

        render();
    }

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
    }

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li ${task.done ? "style=\"text-decoration: line-through\"" : ""}>
            <button class="js-done"> ${task.done ? "✔" : "_"}</button>
            ${task.content}
            <button class="js-remove">🗑</button>
            </li>
        `;
        }

        document.querySelector(".js-tasksList").innerHTML = htmlString;

        bindEvents();

    };

    const addNewTask = (newTask) => {
        tasks.unshift(
            {
                content: newTask,
            }
        );

        render();
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTask = document.querySelector(".js-newTaskContent").value.trim();

        if (newTask === "") {
            return;
        }

        addNewTask(newTask);
    }

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();

}


//const tasksList = document.querySelector(".js-tasksList")
//tasksList.classList.toggle("section_list--done")