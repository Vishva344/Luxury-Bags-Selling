import { Bag } from './bags.entity';
import { Cart } from './cart.entity';
import { Favorite } from './favorite.entity';
import { User } from './user.entity';
import { Variant } from './variant.entity';

const entities = [User, Bag, Variant, Favorite, Cart];

export { User, Bag, Variant, Favorite, Cart };
export default entities;
