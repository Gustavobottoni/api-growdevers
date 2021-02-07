
import API from './api';

class App {
    constructor() {
        this.token = "";
        this.user_uid = "";

        this.registerButtons();



    }

    registerButtons() {
        document.getElementById("logar").onclick = () => this.login();
        document.getElementById("register").onclick = () => this.userRegister();
        document.getElementById("bt-register").onclick = () => this.registerPage();
    }

    registerPage() {
        document.getElementById("loginPage").style.display = "none";
        document.getElementById("registerPage").style.display = "flex";


    }

    userRegister() {
        const name = document.getElementById("name").value;
        const username = document.getElementById("usernameRegister").value;
        const password = document.getElementById("passwordRegister").value;
        const userType = document.getElementById("user-type").value;


        API.post('/users', {
            "name": name,
            "password": password,
            "type": userType,
            "username": username
        })
            .then(r => {
                console.log(r.data)
                document.getElementById("registerPage").style.display = "none";
                document.getElementById("loginPage").style.display = "flex";

            })
            .catch(e => alert(e.response.data.message))

    }

    login() {
        const username = document.getElementById("usernameLogin").value;
        const password = document.getElementById("passwordLogin").value;

        API.post('/login', {
            "username": username,
            "password": password
        }).then(r => {
            const { success, token } = r.data;
            if (success) {
                this.token = token;
                this.user_uid = r.data.user.uid;
                document.getElementById("loginPage").style.display = "none";
                this.buscaGrowdevers();
            }
        })
            .catch(e => alert(e.response.data.message))

    }

    buscaGrowdevers() {
        API.getAutenticado('/growdevers', this.token)
            .then(r => {
                let html = "";
                r.data.growdevers.forEach((gd) => {
                    html += `
                    <ul class="list-group list-group-horizontal flex-fill">
                        <li class="list-group-item col-5">${gd.user.name}</li>
                        <li class="list-group-item col-10">${gd.email}</li>
                        <li class="list-group-item col-5">${gd.program}</li>
                        <button type="button" class="btn btn-primary col-2">Primary</button>
                    </ul>
                    `;
                });
                document.getElementById("growdevers").innerHTML = html;
                document.getElementById("growdevers").style.display = "flex";
            });
    }

}

new App();
