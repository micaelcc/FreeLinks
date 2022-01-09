import bcrypt from 'bcrypt';
import { IEncrypter } from 'data/protocols/encrypter';

class BcryptAdapter implements IEncrypter {
  private readonly salt: number;

  constructor(salt: number) {
    this.salt = salt;
  }

  async encrypt(value: string): Promise<string> {
    return bcrypt.hash(value, this.salt);
  }
}

export { BcryptAdapter };
