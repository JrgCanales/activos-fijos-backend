import { Column, DataType, Model, Table } from "sequelize-typescript";
import { conn } from "../database/connection";
import * as Sequelize from "sequelize-typescript";
import { Asset } from "./asset";

export interface CategoryAddModel {
    id: number;
    name: string;
    description: string;
}

//esta sera la mapeada con seq
export interface CategoryModel extends Sequelize.Model<CategoryModel, CategoryAddModel> {
    id: number;
    name: string;
    description: string;
    createdAt: Date;
    updateAt: Date;
}

//aqui se hace el mapeo
//define: permite agregar un modelo a la base de datos, convirtiendolo en tabla
export const Category = conn.define<CategoryModel, CategoryAddModel>('Categories',{
    id: {
        type: Sequelize.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.DataType.STRING(50),
        unique: true
    },
    description: {
        type: Sequelize.DataType.STRING(250)
    }
});

//creando relacion
Category.hasMany(Asset, {
    sourceKey: 'id', //lave 
    foreignKey: 'category_id', //nombre del campo que se creara en la tabla
    as: 'categories'
})