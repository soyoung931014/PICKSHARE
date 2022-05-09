// import { createParamDecorator, ExecutionContext } from "@nestjs/common";
// import { Board } from "./board.entity";

// export const GetBoard = createParamDecorator(
//     (data: unknown, ctx: ExecutionContext): Board => {
//         const req = ctx.switchToHttp().getRequest();
//         return req.board;
//     },
// );