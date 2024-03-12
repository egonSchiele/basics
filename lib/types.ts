export type Config = {
  host: string;
  port: number;
  username: string;
  password: string;
};

export type TipFromDb = {
  tips_id: number;
  tips_title: string;
  tips_text: string;
  category_name: string;
};
