export enum EmployeeStatus {"free", "work"}
export enum ProcessStatus {"pending", "working", 'finished'}
export enum PipelineStep {'DoughChef' = 'DoughChef', 'ToppingChef' = 'ToppingChef', 'Oven' = 'Oven', 'Serving' = 'Serving'}

export type Order = {
    finishedTime?: number | string;
    startTime?: number | string;
    name: string, toppings: string[], pipelineStep?: PipelineStep, processStatus?: ProcessStatus, workProcess?: Array<string>}