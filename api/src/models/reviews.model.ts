import {Entity, model, property} from '@loopback/repository';

@model()
export class Reviews extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  reviewId?: string;

  @property({
    type: 'string',
    required: true,
  })
  userId: string;

  @property({
    type: 'string',
    required: true,
  })
  content: string;

  @property({
    type: 'date',
  })
  createdOn?: string;

  @property({
    type: 'date',
  })
  editedOn?: string;

  @property({
    type: 'string',
    required: true,
  })
  productId: string;


  constructor(data?: Partial<Reviews>) {
    super(data);
  }
}

export interface ReviewsRelations {
  // describe navigational properties here
}

export type ReviewsWithRelations = Reviews & ReviewsRelations;
