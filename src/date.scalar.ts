import { Scalar, CustomScalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Date')
export class DateScalar implements CustomScalar<number, Date> {
  description = 'Date custom scalar type';

  // Which will serialize the value that must be sent to the client
  serialize(value: Date): number {
    return value.getTime();
  }

  // Two function below are used to received value as an argument from the client query
  parseValue(value: number | string): Date {
    return new Date(value);
  }

  parseLiteral(value: ValueNode): Date {
    if (value.kind === Kind.INT) {
      return new Date(value.value);
    }
    return null;
  }
}
