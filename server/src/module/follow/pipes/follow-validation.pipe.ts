// import { ArgumentMetadata, PipeTransform } from "@nestjs/common";
// import { UserRepository } from "src/module/user/user.repository";

// export class FollowStatusPipe implements PipeTransform {
//     constructor(
//         private userRepository: UserRepository
//     ) {}
    
//     async transform(value: any, metadata: ArgumentMetadata) {
//         const findUser = await this.userRepository.find({
//             where: {
//                 nickname: value
//             }
//         })

//         throw new Error("Method not implemented.");
//     }
// }