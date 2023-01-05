import { Employee } from "./Employee";
import { EmployeeStatus, Order } from "./types";

export class ToppingChef extends Employee {
  constructor(workDuration: number, name: string, ) {
    super(workDuration, name);
  }


  public doWork = (callBack: Function, order: Order) => {
    if (this.status === EmployeeStatus.free) {
      this.status = EmployeeStatus.work;

      setTimeout(() => {
          this.status = EmployeeStatus.free;
            callBack();
      }, Math.round(order.toppings.length/2) * this.workDuration);
    }
  };

  public checkStatus = () => this.status === EmployeeStatus.free
}
