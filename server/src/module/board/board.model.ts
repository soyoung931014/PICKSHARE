import { Lock, Mood, PictureMethod } from './board-state.union';

export interface Board {
  id: number;
  title: string;
  picture: string;
  pictureMethod: PictureMethod;
  mood: Mood;
  lock: Lock;
  content: string;
  date: string;
  created_at: Date;
  updated_at: Date;
}
