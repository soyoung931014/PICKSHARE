import { Lock, Mood, PictureMethod } from '../board-state.union';

export class CreateBoardDto {
  user: number;
  title: string;
  picture: string;
  pictureMethod: PictureMethod;
  mood: Mood;
  lock: Lock;
  content: string;
  date: string;
}
