export interface Phone {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
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