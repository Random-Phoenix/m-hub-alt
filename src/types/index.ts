export interface Phone {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  views: number;
  releaseDate: Date;
  trending: boolean;
  specs: {
    screen: string;
    processor: string;
    camera: string;
  };
}

export interface Slide {
  image: string;
  title: string;
  subtitle: string;
}