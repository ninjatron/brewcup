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
  User,
  Reviews,
} from '../models';
import {UserRepository} from '../repositories';

export class UserReviewsController {
  constructor(
    @repository(UserRepository) protected userRepository: UserRepository,
  ) { }

  @get('/users/{id}/reviews', {
    responses: {
      '200': {
        description: 'Array of User has many Reviews',
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
    return this.userRepository.reviews(id).find(filter);
  }

  @post('/users/{id}/reviews', {
    responses: {
      '200': {
        description: 'User model instance',
        content: {'application/json': {schema: getModelSchemaRef(Reviews)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof User.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Reviews, {
            title: 'NewReviewsInUser',
            exclude: ['reviewId'],
            optional: ['userId']
          }),
        },
      },
    }) reviews: Omit<Reviews, 'reviewId'>,
  ): Promise<Reviews> {
    return this.userRepository.reviews(id).create(reviews);
  }

  @patch('/users/{id}/reviews', {
    responses: {
      '200': {
        description: 'User.Reviews PATCH success count',
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
    return this.userRepository.reviews(id).patch(reviews, where);
  }

  @del('/users/{id}/reviews', {
    responses: {
      '200': {
        description: 'User.Reviews DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Reviews)) where?: Where<Reviews>,
  ): Promise<Count> {
    return this.userRepository.reviews(id).delete(where);
  }
}
