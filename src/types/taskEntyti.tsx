import { TaskBodyEntity } from "./taskBodyEntity";

// export enum Priorities {
//   High = 'high',
//   Medium = 'medium',
//   Low = 'low',
//   Undefined = 'undefined'
// }

export type Priorities = "high" | "medium" | "low" | "undefined";

export interface TaskEntity {
  id: string;
  labels: Priorities[];
  title: string;
  body: TaskBodyEntity;
}
