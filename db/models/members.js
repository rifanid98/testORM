'use strict';
const {
  Model, Sequelize
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Members extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.MemberTypes, { as: "member_type", foreignKey: "member_type_id"});
      this.belongsTo(models.Users, { as: "user", foreignKey: "user_id"});
      this.hasMany(models.MemberOTPs, { as: "member_otps", foreignKey: "member_id"});
      this.hasMany(models.MemberAddresses, { as: "member_addresses", foreignKey: "member_id"});
      this.hasMany(models.MemberNotifications, { as: "member_notifications", foreignKey: "member_id"});
      this.hasMany(models.MemberTokens, { as: "member_tokens", foreignKey: "member_id"});
    }
  };
  Members.init({
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "member.id",
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "user.id",
      references: {
        model: 'users',
        key: 'id'
      }
    },
    member_type_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "member_type.id",
      references: {
        model: 'member_type',
        key: 'id'
      }
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: false,
      comment: "member phone"
    },
    field_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "member field name"
    },
    gender: {
      type: DataTypes.ENUM("L", "P"),
      allowNull: false,
      comment: "ENUM('P,'L')"
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      comment: "member birth date"
    },
    birth_place: {
      type: DataTypes.STRING(187),
      allowNull: true,
      comment: "member birth place"
    },
    religion: {
      type: DataTypes.STRING(10),
      allowNull: true,
      comment: "member religion"
    },
    status: {
      type: DataTypes.ENUM("active", "inactive", "pending"),
      allowNull: false,
      defaultValue: "pending",
      comment: "ENUM('active','inactive','pending')"
    },
    geo_latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      comment: "member geolocation latitude"
    },
    geo_longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true,
      comment: "member geolocation longitude"
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "created date"
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "updated date"
    }
  }, {
    sequelize,
    modelName: 'Members',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "member_pk",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return Members;
};