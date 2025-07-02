import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const btn = document.querySelector(".btn");
const fieldset = document.querySelectorAll("input[state]");

let options = {
    value: "",
    delay: 0
}

form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    options.value = form.state.value,
    options.delay = form.delay.value

    const makePromise = ({ value, delay }) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (value === "fulfilled") {
                    resolve(`Fulfilled promise in ${delay}ms`)
                } else {
                    reject(`Rejected promise in ${delay}ms`)
                }
            }, delay);
        });
    };

    makePromise(options)
        .then(value => iziToast.success({
            title: value,
            position: "topRight"
        }))
        .catch(error => iziToast.error({
            title: error,
            position: "topRight"
        }));
    
    form.reset();

    options = {
        value: "",
        delay: 0
    }
});