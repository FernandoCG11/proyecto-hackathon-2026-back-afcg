import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
    encryptPassword(plainPassword: string): Promise<string> {
        const saltRounds = Math.floor(Math.random() * (15 - 10) + 10);
        return bcrypt.hash(plainPassword, saltRounds);
    }

    checkPassword(password: string, lastPasword: string): boolean {
        const validation = bcrypt.compareSync(password, lastPasword);
        return validation;
    }
}
