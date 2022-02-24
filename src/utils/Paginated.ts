import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, ApiQuery, getSchemaPath } from '@nestjs/swagger';

export class PaginatedResponse<T> {
  constructor(queryResult: [T[], number], page: number, pageSize: number) {
    this.list = queryResult[0];
    this.total = queryResult[1];
    this.page = page;
    this.pageSize = pageSize;
  }

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
        title: `PaginatedResponseOf${model.name}`,
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
    ApiQuery({ name: 'page', required: false, type: 'number' }),
    ApiQuery({ name: 'pageSize', required: false, type: 'number' }),
  );
};
