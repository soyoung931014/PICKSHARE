import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from './dto/login-user.dto';
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

    async login(loginDto: LoginDto): Promise<{ message: string, data: string, statusCode: number }> {
        console.log(loginDto, 'loginDto')
        const { email, password } = loginDto;

        const user = await this.userRepository.findOne({ email, password })

        if (user) {
            return { message: 'login success', data: `${loginDto}`, statusCode: 200 }
        } else {
            throw new UnauthorizedException('invalid user information')
        }
    }
}
