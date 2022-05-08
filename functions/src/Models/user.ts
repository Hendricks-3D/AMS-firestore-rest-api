class User {
  id? = "";
  username? = "";
  password? = "";
  email? = "";
  emailVerified? = false;
}

type Request = {
  body: User;
  params: { userId: string };
};

export { User, Request };
