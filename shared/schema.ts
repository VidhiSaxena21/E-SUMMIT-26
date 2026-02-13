export interface Event {
  id: number;
  title: string;
  description: string;
  time: string;
  location: string;
  speaker?: string;
  imageUrl?: string;
}
