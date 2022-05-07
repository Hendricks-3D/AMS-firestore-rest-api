class User {
  username!: string;
  password!: string;
  email!: string;
  emailVerified!: false;
}

type Request = {
  body: User;
  params: { userId: string };
};
export { User, Request };
