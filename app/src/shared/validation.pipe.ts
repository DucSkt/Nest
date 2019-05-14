import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common'
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metaData: ArgumentMetadata) {
    if(value instanceof Object && this.isEmpty(value)) {  // có lỗi: put lên
      // empty
      throw new HttpException('Validate failed: No body submitted', HttpStatus.BAD_REQUEST)
    }
    const { metatype } = metaData;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    Logger.log(errors,  "AAAA", true);
    if (errors.length > 0) {   // có lỗi: Post lên thiếu file
      throw new HttpException(`Validation faile 11: ${this.formatErrors(errors)}`, HttpStatus.BAD_REQUEST);
      // throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: any[]) {
    return errors
    .map(err => {
        for(const property in err.constraints ) {
          return err.constraints[property];
        }
      })
    .join(', ');
  }
  private isEmpty(value: any) {
    if(Object.keys(value).length > 0) {
      return false;
    }
    return true;
  }
}