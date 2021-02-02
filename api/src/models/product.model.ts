import {Entity, model, property, hasMany} from '@loopback/repository';
import {Reviews} from './reviews.model';

@model()
export class Product extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  productId?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
  })
  region?: string;

  @property({
    type: 'string',
  })
  estate?: string;

  @property({
    type: 'string',
    required: true,
  })
  teaType: string;

  @property({
    type: 'string',
  })
  leafType?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  isLoose: boolean;

  @property({
    type: 'string',
  })
  teaFlavor?: string;

  @hasMany(() => Reviews)
  reviews: Reviews[];

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
