var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var TaskType;
(function (TaskType) {
    TaskType[TaskType["StartUp"] = 0] = "StartUp";
    TaskType[TaskType["AdminLogin"] = 1] = "AdminLogin";
    TaskType[TaskType["CreateUser"] = 2] = "CreateUser";
    TaskType[TaskType["AdminLogout"] = 3] = "AdminLogout";
    TaskType[TaskType["UserLogin"] = 4] = "UserLogin";
    TaskType[TaskType["UserLogout"] = 5] = "UserLogout";
    TaskType[TaskType["AdminSecondtimeLogin"] = 6] = "AdminSecondtimeLogin";
    TaskType[TaskType["DeleteUser"] = 7] = "DeleteUser";
    TaskType[TaskType["AdminSecondtimeLogout"] = 8] = "AdminSecondtimeLogout";
    TaskType[TaskType["TestComplete"] = 9] = "TestComplete";
})(TaskType || (TaskType = {}));
var tasks = [{
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
    }];
var config = {
    delay: 500,
    adminLogin: "",
    adminPassword: "",
    userLogin: "TestUserLogin",
    userPassword: "1q2w#e$R"
};
var App = /** @class */ (function () {
    function App() {
        this.iframeReference = null;
        this.nestedDocument = null;
        this.nestedWindow = null;
        this.startupButton = null;
        this.panelLog = null;
        this.startupButton = document.querySelector(".js-startup-button");
        this.iframeReference = document.querySelector(".iframe");
        this.panelLog = document.querySelector(".panel__log");
        this.init();
    }
    App.getInstance = function () {
        if (App.instance == null)
            App.instance = new App();
        return App.instance;
    };
    App.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve) {
                            _this.iframeReference.addEventListener('load', function () {
                                _this.nestedDocument = _this.iframeReference.contentDocument;
                                _this.nestedWindow = _this.iframeReference.contentWindow;
                                resolve();
                            });
                        })];
                    case 1:
                        _a.sent();
                        this.startupButton.addEventListener('click', function (e) {
                            var element = e.target;
                            if (!element.classList.contains("disable")) {
                                _this.startup();
                            }
                        });
                        this.renderCheckList();
                        return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.startup = function () {
        return __awaiter(this, void 0, void 0, function () {
            var adminLogin, adminPassword, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 12, , 13]);
                        adminLogin = document.querySelector(".js-admin-login");
                        adminPassword = document.querySelector(".js-admin-password");
                        config.adminLogin = adminLogin.value;
                        config.adminPassword = adminPassword.value;
                        this.renderCheckList();
                        this.startupButton.classList.add("disable");
                        this.completeTask(TaskType.StartUp);
                        return [4 /*yield*/, Screens.auth(this.nestedDocument, config.adminLogin, config.adminPassword)];
                    case 1:
                        _a.sent();
                        this.completeTask(TaskType.AdminLogin);
                        return [4 /*yield*/, this.setLocation("/assad-id/settings/operators/add/")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, Screens.createUser(this.nestedDocument)];
                    case 3:
                        _a.sent();
                        this.completeTask(TaskType.CreateUser);
                        return [4 /*yield*/, this.setLocation("/assad-id/logout/")];
                    case 4:
                        _a.sent();
                        this.completeTask(TaskType.AdminLogout);
                        return [4 /*yield*/, Screens.auth(this.nestedDocument, config.userLogin, config.userPassword)];
                    case 5:
                        _a.sent();
                        this.completeTask(TaskType.UserLogin);
                        return [4 /*yield*/, this.setLocation('/assad-id/abonents/search')];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, this.setLocation("/assad-id/logout/")];
                    case 7:
                        _a.sent();
                        this.completeTask(TaskType.UserLogout);
                        return [4 /*yield*/, Screens.auth(this.nestedDocument, config.adminLogin, config.adminPassword)];
                    case 8:
                        _a.sent();
                        this.completeTask(TaskType.AdminSecondtimeLogin);
                        return [4 /*yield*/, this.setLocation("/assad-id/settings/operators/TestUserLogin/")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, this.setLocation("/assad-id/settings/operators/TestUserLogin/delete")];
                    case 10:
                        _a.sent();
                        this.completeTask(TaskType.DeleteUser);
                        return [4 /*yield*/, this.setLocation("/assad-id/logout/")];
                    case 11:
                        _a.sent();
                        this.completeTask(TaskType.AdminSecondtimeLogout);
                        this.completeTask(TaskType.TestComplete);
                        this.startupButton.classList.remove("disable");
                        return [3 /*break*/, 13];
                    case 12:
                        e_1 = _a.sent();
                        console.error(e_1);
                        alert("Произошла ошибка! Тестирование остановлено!");
                        this.renderCheckList();
                        return [3 /*break*/, 13];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    App.prototype.setLocation = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                console.log("SET LOCATION", url);
                return [2 /*return*/, new Promise(function (resolve) {
                        setTimeout(function () {
                            _this.nestedWindow.location.href = url;
                            _this.iframeReference.addEventListener('load', function () { return resolve(); }, { once: true });
                        }, config.delay);
                    })];
            });
        });
    };
    App.prototype.completeTask = function (type) {
        var task = document.querySelector(".task-" + type);
        task.classList.add("is-complete");
    };
    App.prototype.renderCheckList = function () {
        this.startupButton.classList.remove("disable");
        this.panelLog.innerHTML = tasks.map(function (task) {
            return "<div class=\"task task-" + task.key + "\">\n                " + task.value + "\n            </div>";
        }).join(" ");
    };
    App.instance = null;
    return App;
}());
var Screens = /** @class */ (function () {
    function Screens() {
    }
    Screens.auth = function (context, login, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    return [2 /*return*/, new Promise(function (resolve) {
                            setTimeout(function () {
                                var userInput = context.querySelector("input[name='user']");
                                var passwordInput = context.querySelector("input[name='password']");
                                var buttonSumbit = context.querySelector("button[type='submit']");
                                console.log("USER_INPUT", userInput);
                                userInput.value = login;
                                passwordInput.value = password;
                                setTimeout(function () {
                                    buttonSumbit.click();
                                    resolve();
                                }, config.delay);
                            }, config.delay);
                        })];
                }
                catch (e) {
                    console.error(e);
                    return [2 /*return*/, null];
                }
                return [2 /*return*/];
            });
        });
    };
    Screens.createUser = function (context) {
        try {
            return new Promise(function (resolve) {
                var loginInput = context.querySelector("#login");
                var fullnameInput = context.querySelector("#fullName");
                var passwordInput = context.querySelector("#password");
                var confirmPasswordInput = context.querySelector("#confirmPassword");
                var roleSelect = context.querySelector("select#role");
                loginInput.value = config.userLogin;
                fullnameInput.value = "TestUserFullName";
                passwordInput.value = config.userPassword;
                confirmPasswordInput.value = config.userPassword;
                roleSelect.value = "guest";
                setTimeout(function () {
                    context.dispatchEvent(new Event('submitForm'));
                    resolve();
                }, config.delay);
            });
        }
        catch (e) {
            console.error(e);
            return null;
        }
    };
    return Screens;
}());
var application = App.getInstance();
