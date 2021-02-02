import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {User, UserRelations, UserCredentials, Reviews} from '../models';
import {UserCredentialsRepository} from './user-credentials.repository';
import {ReviewsRepository} from './reviews.repository';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
> {

  public readonly userCredentials: HasOneRepositoryFactory<UserCredentials, typeof User.prototype.id>;

  public readonly reviews: HasManyRepositoryFactory<Reviews, typeof User.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('UserCredentialsRepository') protected userCredentialsRepositoryGetter: Getter<UserCredentialsRepository>, @repository.getter('ReviewsRepository') protected reviewsRepositoryGetter: Getter<ReviewsRepository>,
  ) {
    super(User, dataSource);
    this.reviews = this.createHasManyRepositoryFactoryFor('reviews', reviewsRepositoryGetter,);
    this.userCredentials = this.createHasOneRepositoryFactoryFor('userCredentials', userCredentialsRepositoryGetter);
  }
}
