import { EmployeeStatus, Order } from "./types";

export class Employee {
  constructor(workDuration: number, name: string) {
    this.workDuration = workDuration;
    this.status = EmployeeStatus.free;
    this.name = name;
  }
  protected status: EmployeeStatus;
  protected workDuration: number;
  protected name: string;

  public doWork = (callBack: Function, order: Order, start: number) => {
    if (this.status === EmployeeStatus.free) {
      this.status = EmployeeStatus.work;

      setTimeout(() => {
          this.status = EmployeeStatus.free;
       if(order?.workProcess){
         console.log(`${this.name} start working on order ${order.name} at ${new Date(start).toLocaleString()}  finished at ${new Date(Date.now()).toLocaleString()}`)
         order.workProcess.push(`${this.name} start working on order ${order.name} at ${new Date(start).toLocaleString()} and  finished at ${new Date(Date.now()).toLocaleString()}`)
       }
            callBack();

      }, this.workDuration);
    }
  };

  public checkStatus = () => this.status === EmployeeStatus.free
}
