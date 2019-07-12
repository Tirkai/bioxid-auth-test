interface ICreateUserWindow extends Window {
    submitForm: () => void;
}

enum TaskType {
    StartUp, AdminLogin, CreateUser, AdminLogout, UserLogin, UserLogout, AdminSecondtimeLogin, DeleteUser, AdminSecondtimeLogout, TestComplete
}

const tasks = [{
    key: TaskType.StartUp,
    value: "Начало тестирования",
}, {
    key: TaskType.AdminLogin,
    value: "Авторизация администратора",
}, {
    key: TaskType.CreateUser,
    value: "Создание пользователя",
}, {
    key: TaskType.AdminLogout,
    value: "Выход администратора из системы",
}, {
    key: TaskType.UserLogin,
    value: "Авторизация пользователя",
}, {
    key: TaskType.UserLogout,
    value: "Выход пользователя из системы",
}, {
    key: TaskType.AdminSecondtimeLogin,
    value: "Авторизация администратора",
}, {
    key: TaskType.DeleteUser,
    value: "Удаление пользователя",
}, {
    key: TaskType.AdminSecondtimeLogout,
    value: "Выход администратора из системы",
}, {
    key: TaskType.TestComplete,
    value: "Завершение тестирования",
}]

const config = {
    delay: 500,
    adminLogin: "",
    adminPassword: "",
    userLogin: "TestUserLogin",
    userPassword: "1q2w#e$R"
}

class App {
    public static instance: App = null;
    public static getInstance(): App {
        if (App.instance == null) App.instance = new App();
        return App.instance;
    }
    private iframeReference: HTMLIFrameElement = null;
    private nestedDocument: Document = null;
    private nestedWindow: Window = null;
    private startupButton: HTMLDivElement = null;
    private panelLog: HTMLDivElement = null;
    constructor() {
        this.startupButton = document.querySelector(".js-startup-button");
        this.iframeReference = document.querySelector(".iframe");
        this.panelLog = document.querySelector(".panel__log");
        this.init();
    }

    async init() {
        await new Promise(resolve => {
            this.iframeReference.addEventListener('load', () => {
                this.nestedDocument = this.iframeReference.contentDocument;
                this.nestedWindow = this.iframeReference.contentWindow;
                resolve();
            });
        })
        this.startupButton.addEventListener('click', (e: MouseEvent) => {
            const element: HTMLDivElement = e.target as HTMLDivElement;
            if (!element.classList.contains("disable")) {
                this.startup();
            }
        });
        this.renderCheckList();
    }

    public async startup() {
        try {
            const adminLogin: HTMLInputElement = document.querySelector(".js-admin-login");
            const adminPassword: HTMLInputElement = document.querySelector(".js-admin-password");
            config.adminLogin = adminLogin.value;
            config.adminPassword = adminPassword.value;

            this.renderCheckList();
            this.startupButton.classList.add("disable");

            this.completeTask(TaskType.StartUp);

            await Screens.auth(this.nestedDocument, config.adminLogin, config.adminPassword);
            this.completeTask(TaskType.AdminLogin);

            await this.setLocation("/assad-id/settings/operators/add/");
            await Screens.createUser(this.nestedDocument);
            this.completeTask(TaskType.CreateUser);

            await this.setLocation("/assad-id/logout/");
            this.completeTask(TaskType.AdminLogout);

            await Screens.auth(this.nestedDocument, config.userLogin, config.userPassword);
            this.completeTask(TaskType.UserLogin);

            await this.setLocation('/assad-id/abonents/search');
            await this.setLocation("/assad-id/logout/");
            this.completeTask(TaskType.UserLogout);

            await Screens.auth(this.nestedDocument, config.adminLogin, config.adminPassword);
            this.completeTask(TaskType.AdminSecondtimeLogin);

            await this.setLocation("/assad-id/settings/operators/TestUserLogin/");
            await this.setLocation("/assad-id/settings/operators/TestUserLogin/delete");
            this.completeTask(TaskType.DeleteUser);

            await this.setLocation("/assad-id/logout/");
            this.completeTask(TaskType.AdminSecondtimeLogout);

            this.completeTask(TaskType.TestComplete);

            this.startupButton.classList.remove("disable");

        } catch (e) {
            console.error(e);
            alert("Произошла ошибка! Тестирование остановлено!");
            this.renderCheckList();
        }

    }

    public async setLocation(url: string) {
        console.log("SET LOCATION", url);
        return new Promise(resolve => {
            setTimeout(() => {
                this.nestedWindow.location.href = url;
                this.iframeReference.addEventListener('load', () => resolve(), { once: true })
            }, config.delay);
        })
    }
    public completeTask(type: TaskType) {
        const task: HTMLDivElement = document.querySelector(".task-" + type);
        task.classList.add("is-complete")
    }

    public renderCheckList() {
        this.startupButton.classList.remove("disable");
        this.panelLog.innerHTML = tasks.map(task => {
            return `<div class="task task-${task.key}">
                ${task.value}
            </div>`
        }).join(" ");
    }
}

class Screens {
    static async auth(context: Document, login: string, password: string) {
        try {
            return new Promise((resolve) => {
                setTimeout(() => {
                    const userInput: HTMLInputElement = context.querySelector(`input[name='user']`);
                    const passwordInput: HTMLInputElement = context.querySelector(`input[name='password']`);
                    const buttonSumbit: HTMLButtonElement = context.querySelector(`button[type='submit']`);
                    console.log("USER_INPUT", userInput);
                    userInput.value = login;
                    passwordInput.value = password;
                    setTimeout(() => {
                        buttonSumbit.click();
                        resolve();
                    }, config.delay);
                }, config.delay)
            })
        } catch (e) {
            console.error(e);
            return null;
        }

    }

    static createUser(context: Document) {
        try {
            return new Promise((resolve) => {
                const loginInput: HTMLInputElement = context.querySelector(`#login`);
                const fullnameInput: HTMLInputElement = context.querySelector(`#fullName`);
                const passwordInput: HTMLInputElement = context.querySelector(`#password`);
                const confirmPasswordInput: HTMLInputElement = context.querySelector(`#confirmPassword`);
                const roleSelect: HTMLSelectElement = context.querySelector(`select#role`);

                loginInput.value = config.userLogin;
                fullnameInput.value = "TestUserFullName";
                passwordInput.value = config.userPassword;
                confirmPasswordInput.value = config.userPassword;
                roleSelect.value = "guest";
                setTimeout(() => {
                    context.dispatchEvent(new Event('submitForm'));
                    resolve();
                }, config.delay);
            })
        } catch (e) {
            console.error(e);
            return null;
        }

    }
}


const application = App.getInstance();