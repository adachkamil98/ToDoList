
const welcome = () => {
    console.log("Hello World!")
};

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

const render = () => {
    let htmlString = "";

    for (const task of tasks) {
        htmlString += `
            <li ${task.done ? "style=\"text-decoration: line-through\"" : ""}>
            ${task.content}
            </li>
        `;
    }

    document.querySelector(".js-tasksList").innerHTML = htmlString;
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
    
    if(newTask === "") {
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
//const tasksList = document.querySelector(".js-tasksList")
//tasksList.classList.toggle("section_list--done")