import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Reviews, ReviewsRelations} from '../models';

export class ReviewsRepository extends DefaultCrudRepository<
  Reviews,
  typeof Reviews.prototype.reviewId,
  ReviewsRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Reviews, dataSource);
  }
}
