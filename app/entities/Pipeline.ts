import {Employee} from "./Employee";
import {ToppingChef} from "./ToppingChef";
import {Order, PipelineStep, ProcessStatus} from "./types";
import  {insertOrder} from '../services/orders/order.service'

export class Pipeline {
  constructor(orders: Order[]) {
    this.orders = orders;
    this.finished =[]
    this.run();
  }
  private orders: Order[];
  private finished: Array<Order>
  private start = Date.now();
  private pipelineSteps = {
    [PipelineStep.DoughChef]: [
      new Employee(7000, "Denis"),
      new Employee(7000, "Dima"),
    ],

    [PipelineStep.ToppingChef]: [
      new ToppingChef(4000, "Vova"),
      new ToppingChef(4000, "Petya"),
      new ToppingChef(4000, "Vasya"),
    ],
    [PipelineStep.Oven]: [new Employee(10000, "Olya")],
    [PipelineStep.Serving]: [
      new Employee(5000, "Katya"),
      new Employee(5000, "Masha"),
    ],
  };

  private changeOrderStatus = async (order: Order) => {

    if (order.pipelineStep === PipelineStep.DoughChef) {
      order.pipelineStep = PipelineStep.ToppingChef;
    } else if (order.pipelineStep === PipelineStep.ToppingChef) {
      order.pipelineStep = PipelineStep.Oven;
    } else if (order.pipelineStep === PipelineStep.Oven) {
      order.pipelineStep = PipelineStep.Serving;
    } else if (order.pipelineStep === PipelineStep.Serving && order.processStatus !== ProcessStatus.finished) {
      order.processStatus = ProcessStatus.finished;

      if(!order.finishedTime){
        console.log(order.name, 'end time')
        order.finishedTime = Date.now()
      }

      this.finished.push(order)
      await insertOrder(order)
      if (this.orders.length === this.finished.length) {
        console.log("All orders finished and insert in database")
      }
      return;
    }
    order.processStatus = ProcessStatus.pending
    return;
  };

  private run = () => {
    this.orders.forEach((order, idx) => {

      if (!order.pipelineStep) {
        order.pipelineStep = PipelineStep.DoughChef;
        order.processStatus = ProcessStatus.pending;
        order.workProcess=[]
      }

      if (order.processStatus === ProcessStatus.finished) {
        return;
      }
      this.pipelineSteps[order.pipelineStep].forEach((employee) => {
        if (order.processStatus === ProcessStatus.pending && employee.checkStatus()) {
          order.processStatus = ProcessStatus.working
          if(!order.startTime){
            console.log(order.name, 'start time')
            order.startTime = Date.now()
          }


          employee.doWork(() => {
            this.changeOrderStatus(order);
            this.run();
          }, order, this.start);
        }
      });
    });
  };
}
