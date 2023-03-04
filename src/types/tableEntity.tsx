import { CardEntity } from "./cardEntity";

export interface TableEntity {
  id: string;
  title: string;
  cards: CardEntity[];
}