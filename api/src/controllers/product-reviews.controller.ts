import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Product,
  Reviews,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductReviewsController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/reviews', {
    responses: {
      '200': {
        description: 'Array of Product has many Reviews',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Reviews)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Reviews>,
  ): Promise<Reviews[]> {
    return this.productRepository.reviews(id).find(filter);
  }

  @post('/products/{id}/reviews', {
    responses: {
      '200': {
        description: 'Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(Reviews)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Product.prototype.productId,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reviews, {
            title: 'NewReviewsInProduct',
            exclude: ['reviewId'],
            optional: ['productId']
          }),
        },
      },
    }) reviews: Omit<Reviews, 'reviewId'>,
  ): Promise<Reviews> {
    return this.productRepository.reviews(id).create(reviews);
  }

  @patch('/products/{id}/reviews', {
    responses: {
      '200': {
        description: 'Product.Reviews PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reviews, {partial: true}),
        },
      },
    })
    reviews: Partial<Reviews>,
    @param.query.object('where', getWhereSchemaFor(Reviews)) where?: Where<Reviews>,
  ): Promise<Count> {
    return this.productRepository.reviews(id).patch(reviews, where);
  }

  @del('/products/{id}/reviews', {
    responses: {
      '200': {
        description: 'Product.Reviews DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Reviews)) where?: Where<Reviews>,
  ): Promise<Count> {
    return this.productRepository.reviews(id).delete(where);
  }
}
