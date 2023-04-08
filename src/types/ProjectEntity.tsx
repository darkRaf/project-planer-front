import { CardEntity } from "./cardEntity";

export interface ProjectEntity {
  id: string;
  userId?: string,
  title: string;
  cardsId: string[];
  cards: CardEntity[];
}