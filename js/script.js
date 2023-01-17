
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
            <li>
            ${task.content}
            </li>
        `;
    }

    document.querySelector(".js-tasksList").innerHTML = htmlString;
};

const init = () => {
    render();
};

init();
