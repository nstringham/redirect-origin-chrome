export type RedirectRule = {
  source: string;
  destination: string;
};

export type Storage = {
  rules?: RedirectRule[];
};
