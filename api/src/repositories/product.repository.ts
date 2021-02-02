import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Product, ProductRelations, Reviews} from '../models';
import {ReviewsRepository} from './reviews.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.productId,
  ProductRelations
> {

  public readonly reviews: HasManyRepositoryFactory<Reviews, typeof Product.prototype.productId>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('ReviewsRepository') protected reviewsRepositoryGetter: Getter<ReviewsRepository>,
  ) {
    super(Product, dataSource);
    this.reviews = this.createHasManyRepositoryFactoryFor('reviews', reviewsRepositoryGetter,);
    this.registerInclusionResolver('reviews', this.reviews.inclusionResolver);
  }
}
