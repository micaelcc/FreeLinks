type UserModel = {
  name: string;
  nickname: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
};

type User = {
  id: string;
  name: string;
  nickname: string;
  email: string;
  password: string;
  links: string[];
};

interface IRegisterUser {
  execute(data: UserModel): Promise<void>;
}

export { IRegisterUser, UserModel, User };
