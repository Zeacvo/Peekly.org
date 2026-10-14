export interface HumanFeatureData {
  id: string;
  number: string;
  title: string;
  category: string;
  summary: string;
  overview: string;
  benefits: { title: string; desc: string }[];
  audience: string;
}
