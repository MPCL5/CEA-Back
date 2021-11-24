import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

export class PaginatedResponse<T> {
  list: T[];
  page: number;
  pageSize: number;
  total: number;
}

export function getPaginatedQueryParam(page: number, pageSize: number) {
  if (page < 1) {
    throw new Error('Page must be greater than 0');
  }

  const take = pageSize;
  const skip = (page - 1) * pageSize;

  return { skip, take };
}

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponse) },
          {
            properties: {
              list: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
              page: {
                type: 'number',
              },
              pageSize: {
                type: 'number',
              },
              total: {
                type: 'number',
              },
            },
          },
        ],
      },
    }),
  );
};
