import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpDto } from './dto/singup-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) { }

    async signUp(signUpDto: SignUpDto): Promise<{ message: string, statusCode: number }> {
        return this.userRepository.createUser(signUpDto)
    }
}
