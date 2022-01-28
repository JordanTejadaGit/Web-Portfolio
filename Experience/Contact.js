import Experience from "./Experience";
import NavBar from "./NavBar";

export default class Contact {
    constructor() {
        this.experience = new Experience()
        this.navBar = this.experience.nav
        this.submit = document.querySelector('#submit')

        this.submit.addEventListener('click', () => {
            this.navBar.transformParticlesModel(3)
        })

        this.setForm()
    }

    setForm() {
        var form = document.getElementById("my-form");
        let work = false;
        async function handleSubmit(event) {
            event.preventDefault();
            var status = document.getElementById("status");
            var data = new FormData(event.target);
            fetch(event.target.action, {
            method: form.method,
            body: data,
            headers: {
                'Accept': 'application/json'
            }
            }).then(response => {
            if (response.ok) {
                status.innerHTML = "Thanks for your submission!";
                status.classList.add('fade')
                work = true;
                form.reset()
            } else {
                response.json().then(data => {
                if (Object.hasOwn(data, 'errors')) {
                    status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
                } else {
                    status.innerHTML = "Oops! There was a problem submitting your form"
                }
                })
            }
            }).catch(error => {
            status.innerHTML = "Oops! There was a problem submitting your form"
            });
            
        }

    form.addEventListener("submit", handleSubmit)
    }

}    