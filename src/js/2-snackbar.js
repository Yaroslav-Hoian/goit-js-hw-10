import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const fieldset = document.querySelectorAll("input[name='state']");

let options = {
    value: "",
    delay: 0
}

form.addEventListener("submit", (ev) => {
    ev.preventDefault();

    const selectRadio = Array.from(fieldset).find(radio => radio.checked);
    options.value = selectRadio ? selectRadio.value : "";
    options.delay = Number(form.delay.value);
    console.log(options.value);
    console.log(options.delay);

    const makePromise = ({ value, delay }) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (value === "fulfilled") {
                    resolve(delay)
                } else {
                    reject(delay)
                }
            }, delay);
        });
    };

    makePromise(options)
        .then(delay => iziToast.success({
            title: `Fulfilled promise in ${delay}ms`,
            position: "topRight"
        }))
        .catch(delay => iziToast.error({
            title: `Rejected promise in ${delay}ms`,
            position: "topRight"
        }));
    
    form.reset();

    options = {
        value: "",
        delay: 0
    }
});