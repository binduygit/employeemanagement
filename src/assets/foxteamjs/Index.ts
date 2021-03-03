interface IFoxTeam {}

const clearCache = () => (
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
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

const isAuthenticated = () => (
  target: Object,
  propertyKey: string,
  descriptor: PropertyDescriptor
) => {
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
  //#region const, properties, contructor

  private ACTIVE_EMP = "ACTIVE_EMP";
  private ALL_EMP = "ALL_EMP";
  private X_EMP = "X_EMP";
  private EMPLOYEE = "EMPLOYEE";

  private FINANCE_CTRL = "FINANCE_CTRL";
  private TODAYS_ATTENDACE = "TODAYS_ATTENDACE";

  private PROJECTS = "PROJECTS";
  private SUB_PROJECTS = "SUB_PROJECTS_";

  CompanyId: number = 0;
  BranchId: number = 0;
  EmployeeId: number = 0;
  BaseUrl: string = "";
  constructor(public mode = "production") {}

  //#endregion

  //#region Util functions

  RefreshValues() {
    this.CompanyId = parseInt(
      (document.getElementById("CompanyId") as HTMLInputElement).value
    );
    this.BranchId = parseInt(
      (document.getElementById("BranchId") as HTMLInputElement).value
    );
    this.EmployeeId = parseInt(
      (document.getElementById("EmployeeId") as HTMLInputElement).value
    );
    this.BaseUrl = (document.getElementById(
      "BaseUrl"
    ) as HTMLInputElement).value;
  }

  setMode(_mode: string) {
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

  Cache(key: string, value: any = null) {
    if (value == null) return JSON.parse(sessionStorage.getItem(key));
    else sessionStorage.setItem(key, JSON.stringify(value));
  }

  clearCache() {
    sessionStorage.clear();
  }

  async GetData(data) {
    let result = await data;
    return await result.json();
  }

  //#endregion

  //#region Employee Related functions

  @clearCache()
  async GetActiveEmployees(refresh: false) {
    if (refresh || this.Cache(this.ACTIVE_EMP) == null) {
      const url = `${this.BaseUrl}\\Employee\\GetActiveEmployeeList?CompanyId=${this.CompanyId}`;
      const data = await this.GetData(fetch(url));
      this.Cache(this.ACTIVE_EMP, data);
      console.table(data);
      return data;
    } else {
      return this.Cache(this.ACTIVE_EMP);
    }
  }

  @clearCache()
  async GetAllEmployees(refresh: false) {
    if (refresh || this.Cache(this.ALL_EMP) == null) {
      const url = `${this.BaseUrl}\\Employee\\GetAllEmployeeList?CompanyId=${this.CompanyId}`;
      const data = await this.GetData(fetch(url));
      this.Cache(this.ALL_EMP, data);
      console.table(data);
      return data;
    } else {
      return this.Cache(this.ALL_EMP);
    }
  }

  @clearCache()
  async GetFinalcialControllers(refresh: false) {
    if (refresh || this.Cache(this.FINANCE_CTRL) == null) {
      const url = `${this.BaseUrl}\\Employee\\GetFinancialControllers?CompanyId=${this.CompanyId}`;
      const data = await this.GetData(fetch(url));
      this.Cache(this.FINANCE_CTRL, data);
      console.table(data);
      return data;
    } else {
      return this.Cache(this.FINANCE_CTRL);
    }
  }

  @clearCache()
  async GetXEmployees(refresh: false) {
    if (refresh || this.Cache(this.X_EMP) == null) {
      const url = `${this.BaseUrl}\\Employee\\GetInActiveEmployeeList?CompanyId=${this.CompanyId}`;
      const data = await this.GetData(fetch(url));
      this.Cache(this.X_EMP, data);
      console.table(data);
      return data;
    } else {
      return this.Cache(this.X_EMP);
    }
  }

  @clearCache()
  async GetEmployeeInfo(EmployeeId = -1, refresh: false) {
    if (EmployeeId == -1) EmployeeId = this.EmployeeId;

    if (refresh || this.Cache(this.EMPLOYEE) == null) {
      const url = `${this.BaseUrl}\\Employee\\oneEmployeeData?companyId=${this.CompanyId}&empId=${EmployeeId}`;
      const data = await this.GetData(fetch(url));
      this.Cache(this.EMPLOYEE, data);
      console.table(data);
      return data;
    } else {
      return this.Cache(this.EMPLOYEE);
    }
  }

  @clearCache()
  async GetTodaysAttendance(refresh: true) {
    if (refresh || this.Cache(this.TODAYS_ATTENDACE) == null) {
      let d = new Date();
      let str = `${d.getFullYear()}/${d.getDay()}/${d.getMonth()}`;
      const url = `${this.BaseUrl}\\AttendanceAPI\\PresentEmployee?SearchDate=${str}&CompanyId=${this.CompanyId}`;
      const data = await this.GetData(fetch(url));
      this.Cache(this.TODAYS_ATTENDACE, data);
      console.table(data);
      return data;
    } else {
      return this.Cache(this.TODAYS_ATTENDACE);
    }
  }

  //#endregion

  //#region Project related methods

  @clearCache()
  async GetProjects(refresh: false) {
    if (refresh || this.Cache(this.PROJECTS) == null) {
      const url = `${this.BaseUrl}\\Timesheet\\GetProjectList?CompanyId=${this.CompanyId}`;
      const data = await this.GetData(fetch(url));
      this.Cache(this.PROJECTS, data);
      console.table(data);
      return data;
    } else {
      return this.Cache(this.PROJECTS);
    }
  }

  @clearCache()
  async GetSubProjects(projectId: number, refresh: false) {
    if (refresh || this.Cache(this.SUB_PROJECTS + projectId.toString()) == null) {
      const url = `${this.BaseUrl}\\Timesheet\\GetSubProjectList?CompanyId=${this.CompanyId}&ProjectId=${projectId}`;
      const data = await this.GetData(fetch(url));
      this.Cache(this.SUB_PROJECTS + projectId.toString(), data);
      console.table(data);
      return data;
    } else {
      return this.Cache(this.SUB_PROJECTS + projectId.toString());
    }
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

  GetEmployeeLeaveBalance(EmployeeId: number = -1) {}

  //Employee id sent as -1 if required self
  GetTimeSheetData(EmployeeId = -1) {}

  Ready(fn: any) {
    // see if DOM is already available
    if (
      document.readyState === "complete" ||
      document.readyState === "interactive"
    ) {
      // call on next available tick
      setTimeout(fn, 1);
    } else {
      document.addEventListener("DOMContentLoaded", () => {
        this.RefreshValues();
        fn();
      });
    }
  }
}

var FoxTeam = new foxTeam();
