var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const clearCache = () => (target, propertyKey, descriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        if (this.mode != "production") {
            sessionStorage.clear();
            console.log("sessionStore cleared");
        }
        return originalMethod.apply(this, args);
    };
    return descriptor;
};
const isAuthenticated = () => (target, propertyKey, descriptor) => {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args) {
        if (!document.cookie) {
            window.location.href = "/";
        }
        return originalMethod.apply(this, args);
    };
    return descriptor;
};
class foxTeam {
    constructor(mode = "production") {
        this.mode = mode;
        //#region const, properties, contructor
        this.ACTIVE_EMP = "ACTIVE_EMP";
        this.ALL_EMP = "ALL_EMP";
        this.X_EMP = "X_EMP";
        this.EMPLOYEE = "EMPLOYEE";
        this.FINANCE_CTRL = "FINANCE_CTRL";
        this.TODAYS_ATTENDACE = "TODAYS_ATTENDACE";
        this.PROJECTS = "PROJECTS";
        this.SUB_PROJECTS = "SUB_PROJECTS_";
        this.CompanyId = 0;
        this.BranchId = 0;
        this.EmployeeId = 0;
        this.BaseUrl = "";
    }
    //#endregion
    //#region Util functions
    RefreshValues() {
        this.CompanyId = parseInt(document.getElementById("CompanyId").value);
        this.BranchId = parseInt(document.getElementById("BranchId").value);
        this.EmployeeId = parseInt(document.getElementById("EmployeeId").value);
        this.BaseUrl = document.getElementById("BaseUrl").value;
    }
    setMode(_mode) {
        if (["development", "production"].indexOf(_mode) == -1) {
            throw new Error("Only development or production are the allowed values");
        }
        this.mode = _mode;
    }
    WhoAmI() {
        return {
            CompanyId: this.CompanyId,
            BranchId: this.BranchId,
            EmployeeId: this.EmployeeId,
            BaseUrl: this.BaseUrl,
        };
    }
    Cache(key, value = null) {
        if (value == null)
            return JSON.parse(sessionStorage.getItem(key));
        else
            sessionStorage.setItem(key, JSON.stringify(value));
    }
    clearCache() {
        sessionStorage.clear();
    }
    GetData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield data;
            return yield result.json();
        });
    }
    //#endregion
    //#region Employee Related functions
    GetActiveEmployees(refresh) {
        return __awaiter(this, void 0, void 0, function* () {
            if (refresh || this.Cache(this.ACTIVE_EMP) == null) {
                const url = `${this.BaseUrl}\\Employee\\GetActiveEmployeeList?CompanyId=${this.CompanyId}`;
                const data = yield this.GetData(fetch(url));
                this.Cache(this.ACTIVE_EMP, data);
                console.table(data);
                return data;
            }
            else {
                return this.Cache(this.ACTIVE_EMP);
            }
        });
    }
    GetAllEmployees(refresh) {
        return __awaiter(this, void 0, void 0, function* () {
            if (refresh || this.Cache(this.ALL_EMP) == null) {
                const url = `${this.BaseUrl}\\Employee\\GetAllEmployeeList?CompanyId=${this.CompanyId}`;
                const data = yield this.GetData(fetch(url));
                this.Cache(this.ALL_EMP, data);
                console.table(data);
                return data;
            }
            else {
                return this.Cache(this.ALL_EMP);
            }
        });
    }
    GetFinalcialControllers(refresh) {
        return __awaiter(this, void 0, void 0, function* () {
            if (refresh || this.Cache(this.FINANCE_CTRL) == null) {
                const url = `${this.BaseUrl}\\Employee\\GetFinancialControllers?CompanyId=${this.CompanyId}`;
                const data = yield this.GetData(fetch(url));
                this.Cache(this.FINANCE_CTRL, data);
                console.table(data);
                return data;
            }
            else {
                return this.Cache(this.FINANCE_CTRL);
            }
        });
    }
    GetXEmployees(refresh) {
        return __awaiter(this, void 0, void 0, function* () {
            if (refresh || this.Cache(this.X_EMP) == null) {
                const url = `${this.BaseUrl}\\Employee\\GetInActiveEmployeeList?CompanyId=${this.CompanyId}`;
                const data = yield this.GetData(fetch(url));
                this.Cache(this.X_EMP, data);
                console.table(data);
                return data;
            }
            else {
                return this.Cache(this.X_EMP);
            }
        });
    }
    GetEmployeeInfo(EmployeeId = -1, refresh) {
        return __awaiter(this, void 0, void 0, function* () {
            if (EmployeeId == -1)
                EmployeeId = this.EmployeeId;
            if (refresh || this.Cache(this.EMPLOYEE) == null) {
                const url = `${this.BaseUrl}\\Employee\\oneEmployeeData?companyId=${this.CompanyId}&empId=${EmployeeId}`;
                const data = yield this.GetData(fetch(url));
                this.Cache(this.EMPLOYEE, data);
                console.table(data);
                return data;
            }
            else {
                return this.Cache(this.EMPLOYEE);
            }
        });
    }
    GetTodaysAttendance(refresh) {
        return __awaiter(this, void 0, void 0, function* () {
            if (refresh || this.Cache(this.TODAYS_ATTENDACE) == null) {
                let d = new Date();
                let str = `${d.getFullYear()}/${d.getDay()}/${d.getMonth()}`;
                const url = `${this.BaseUrl}\\AttendanceAPI\\PresentEmployee?SearchDate=${str}&CompanyId=${this.CompanyId}`;
                const data = yield this.GetData(fetch(url));
                this.Cache(this.TODAYS_ATTENDACE, data);
                console.table(data);
                return data;
            }
            else {
                return this.Cache(this.TODAYS_ATTENDACE);
            }
        });
    }
    //#endregion
    //#region Project related methods
    GetProjects(refresh) {
        return __awaiter(this, void 0, void 0, function* () {
            if (refresh || this.Cache(this.PROJECTS) == null) {
                const url = `${this.BaseUrl}\\Timesheet\\GetProjectList?CompanyId=${this.CompanyId}`;
                const data = yield this.GetData(fetch(url));
                this.Cache(this.PROJECTS, data);
                console.table(data);
                return data;
            }
            else {
                return this.Cache(this.PROJECTS);
            }
        });
    }
    GetSubProjects(projectId, refresh) {
        return __awaiter(this, void 0, void 0, function* () {
            if (refresh || this.Cache(this.SUB_PROJECTS + projectId.toString()) == null) {
                const url = `${this.BaseUrl}\\Timesheet\\GetSubProjectList?CompanyId=${this.CompanyId}&ProjectId=${projectId}`;
                const data = yield this.GetData(fetch(url));
                this.Cache(this.SUB_PROJECTS + projectId.toString(), data);
                console.table(data);
                return data;
            }
            else {
                return this.Cache(this.SUB_PROJECTS + projectId.toString());
            }
        });
    }
    //#endregion
    //Employee id sent as -1 if required self
    GetCompanyInfo() {
        console.log("Not implemented yet");
    }
    GetActiveLeads() {
        console.log("Not implemented yet");
    }
    GetHangouts() {
        console.log("Not implemented yet");
    }
    GetEmployeeLeaveBalance(EmployeeId = -1) { }
    //Employee id sent as -1 if required self
    GetTimeSheetData(EmployeeId = -1) { }
    Ready(fn) {
        // see if DOM is already available
        if (document.readyState === "complete" ||
            document.readyState === "interactive") {
            // call on next available tick
            setTimeout(fn, 1);
        }
        else {
            document.addEventListener("DOMContentLoaded", () => {
                this.RefreshValues();
                fn();
            });
        }
    }
}
__decorate([
    clearCache()
], foxTeam.prototype, "GetActiveEmployees", null);
__decorate([
    clearCache()
], foxTeam.prototype, "GetAllEmployees", null);
__decorate([
    clearCache()
], foxTeam.prototype, "GetFinalcialControllers", null);
__decorate([
    clearCache()
], foxTeam.prototype, "GetXEmployees", null);
__decorate([
    clearCache()
], foxTeam.prototype, "GetEmployeeInfo", null);
__decorate([
    clearCache()
], foxTeam.prototype, "GetTodaysAttendance", null);
__decorate([
    clearCache()
], foxTeam.prototype, "GetProjects", null);
__decorate([
    clearCache()
], foxTeam.prototype, "GetSubProjects", null);
var FoxTeam = new foxTeam();
//# sourceMappingURL=foxteam.js.map