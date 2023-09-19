import {
  InferAttributes,
  InferCreationAttributes,
  Model,
  CreationOptional,
  DataTypes,
} from 'sequelize';
import sequelizeConnection from '../config';

class Shorted extends Model<
  InferAttributes<Shorted>,
  InferCreationAttributes<Shorted>
> {
  public id!: CreationOptional<number>;
  public url!: string;
  public shorted!: string;
}

Shorted.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    shorted: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize: sequelizeConnection,
    modelName: 'Shorted',
    timestamps: false,
  },
);

export default Shorted;
