export type User = {
  id: string;
  username: string;
  email: string;
  provider:  "credentials";
};

export type Document = {
  id: string;
  title: string;
  content: string;
};
