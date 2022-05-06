import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class HeartStatusPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        value = Number(value);

        if(value === 'undefined') {
            throw new BadRequestException(`${value} isn't a number`)
        }
        // board_id가 board테이블에 있는지 확인하는 파이프
        return value;
    }
}