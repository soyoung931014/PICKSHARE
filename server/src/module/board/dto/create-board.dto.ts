import { Lock, Mood, PictureMethod } from '../board-state.union';

export class CreateBoardDto {
  title: string;
  picture: string;
  pictureMethod: PictureMethod;
  mood: Mood;
  lock: Lock;
  content: string;
  date: string;
}
