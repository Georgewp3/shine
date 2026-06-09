export type Service = {
  name: string;
  description: string;
  price: string;
};

export const services: Service[] = [
  {
    name: 'Basic Wash',
    description:
      'Exterior & Interior hand wash, wheel cleaning, tire dressing, and streak-free window cleaning.',
    price: 'From €20',
  },
  {
    name: 'Exterior Wash',
    description:
      'Active foam pre-wash, premium shampoo for zero scratches, outerside of windows clean, deep rims cleaning, and high quality tyre shine.',
    price: 'From €10',
  },
  {
    name: 'Interior Cleaning',
    description:
      'Intensive interior focus. Stain removal, steam cleaning, odor neutralization, and UV protection plastic coating.',
    price: 'From €10',
  },
  {
    name: 'Revive Your Seats',
    description:
      'Deep cleaning for leather and fabric using soft brushes and safe protective tools. Eliminates deep dirt, stains, and bad odors without damage - leaving your interior fresh, clean, and protected like new.',
    price: 'From €80',
  },
];
