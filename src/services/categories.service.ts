import { Request, Response } from 'express';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { Category } from '../models/category';

class CategoriesService {
    private categories = [
        { id: 1, name: 'Escritorios', description: ''},
        { id: 2, name: 'Computadoras', description: ''}
    ];

    public async getList(){

        const categoriesDb = await Category.findAll({});

        return categoriesDb;

    }

    public async getOne( id: number ){
        //TODO: agregar mensaje de error cuando no se encuentre el id de la categoria
        const category = await Category.findOne({ where : { id } });

        return category;

    }

    public async create( createCategoryDto: CreateCategoryDto ){
        
        const createCategory = await Category.create(createCategoryDto);

        return createCategory;

    }

    public async update( UpdateCategoryDto : UpdateCategoryDto, id : number ) {
        
        const category = await this.getOne(id);

        if(!category){
            return null;
        }

        const updateCategory = {
            id,
            ...UpdateCategoryDto
        }

        const updatedcategory = await category.update(updateCategory, {where: { id }});

        return this.getOne(id);
    }

    public async delete( id : number) {

        const category = await this.getOne(id);

        if(!category){
            return null;
        }

        const deteledcategory = await Category.destroy({where : { id }});

        return category;
    }
}

export default new CategoriesService();