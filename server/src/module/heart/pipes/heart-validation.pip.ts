import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class HeartStatusPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        value = Number(value);

        if(value === 'undefined') {
            throw new BadRequestException(`${value} isn't a number`)
        }
        // board_id가 board테이블에 있는지 확인하는 파이프
        // 이미 좋아요 있으면 추가 안되게 하는 파이프 필요
        return value;
    }
}