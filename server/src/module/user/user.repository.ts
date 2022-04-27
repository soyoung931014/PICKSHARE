import { EntityRepository, Repository } from "typeorm";
import { SignUpDto } from "./dto/singup-user.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcryptjs';
import { ConflictException, InternalServerErrorException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    // 일반 회원가입(DB생성 및 저장)
    async createUser(signUpDto: SignUpDto): Promise<{ message: string, statusCode: number }> {
        const { email, password, nickname } = signUpDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = this.create({
            email,
            password: hashedPassword,
            nickname,
            userImage: 'nothing',
            statusMessage: 'nothing',
            loginMethod: 1
        })

        try {
            await this.save(user)
            return { message: `${email} signup success`, statusCode: 201 }
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException('Existing username')
            } else {
                throw new InternalServerErrorException();
            }
        }

    }
}

// async createUser(authCredentialsDto: AuthCredentialsDto): Promise < void> {
//     const { username, password } = authCredentialsDto;

//     const salt = await bcrypt.genSalt(); // 솔트만들기
//     const hashedPassword = await bcrypt.hash(password, salt); // 솔트랑 패스워드랑 해시

//     const user = this.create({
//         username,
//         password: hashedPassword
//     })
//         try {
//         await this.save(user)
//     } catch(error) {
//         //console.log(error, 'error')
//         if (error.code === 'ER_DUP_ENTRY') {
//             throw new ConflictException('Existing username')
//         } else {
//             throw new InternalServerErrorException();
//         }
//     }
// }