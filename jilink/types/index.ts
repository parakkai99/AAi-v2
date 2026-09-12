export interface JiLinkAd {
  id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  price?: string;
  contact?: string;
  createdAt: string;
}

export interface JiLinkCategory {
  id: string;
  name: string;
  icon: string;
}
