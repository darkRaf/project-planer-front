import { TaskEntity } from "./taskEntyti";

export interface CardEntity{
  id: string;
  title: string;
  tasks: TaskEntity[];
  
}