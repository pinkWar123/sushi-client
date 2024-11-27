export interface ISection {
  sectionId: string;
  sectionName: string;
}

export interface IDish {
  dishId: string;
  dishName: string;
  currentPrice: number;
}

export interface IDishBySection extends IDish {
  sectionId: string;
}
