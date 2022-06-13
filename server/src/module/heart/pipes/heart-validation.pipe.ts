import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";

export class HeartStatusPipe implements PipeTransform {
    
    transform(value: any, metadata: ArgumentMetadata) {
        value = Number(value);

        if(value === 'undefined') {
            throw new BadRequestException(`${value} isn't a number`)
        }

        return value;
    }
}