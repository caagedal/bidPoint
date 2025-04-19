export function errorMessage(container, error){

    const containerSelector = document.querySelector(container);
    if(!container) return;

    container.innerHTML = "";


    const errorContainer = document.createElement("div");
    errorContainer.className.add();

    const message = document.createElement("p");
    message.className.add("font-bold");
    message.textContent = error;

    errorContainer.appendChild(message);
    container.appendChild(errorContainer);
}