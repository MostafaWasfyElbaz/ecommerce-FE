export type Review = {
  _id: string;
  review: string;
  rating: number;
  product: string;
  user: {
    _id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type ReviewFormData = {
  rating: number;
  review: string;
};
