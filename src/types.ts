export type Rewrite = {
  source: string;
  destination: string;
};

export type Storage = {
  rewrites: Rewrite[];
};
