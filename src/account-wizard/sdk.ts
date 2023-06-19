export type Newsletter = "daily" | "weekly" | "monthly";

export interface User {
  name: string;
  age: number;
  email: string;
  newsletter: Newsletter;
}

export interface TokenResponse {
  user: User;
  token: string;
}

export const createUser = (user: User): Promise<TokenResponse> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user, token: "test.token" });
    }, Math.random() * 1000 + 1000);
  });
