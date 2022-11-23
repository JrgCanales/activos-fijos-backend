import { Request, Response } from 'express';
import { ResponseDto } from '../common/dto/responde.dto';
import { CreateCategoryDto } from '../dtos/create-category.dto';
import { UpdateCategoryDto } from '../dtos/update-category.dto';
import { Category } from '../models/category';

class CategoriesService {

    private responseDto: ResponseDto;

    public async getList(){
        this.responseDto = new ResponseDto();

        try {

            this.responseDto.data = await Category.findAll({});
            this.responseDto.code = 200;
            this.responseDto.message = 'Listado de categorias';

            return this.responseDto;

        } catch (error) {

            this.responseDto.code = 500;
            this.responseDto.message = 'Error interno, por favor revisar logs';

            console.log({error});

            return this.responseDto;

        }

    }

    public async getOne( id: number ){
        //TODO: agregar mensaje de error cuando no se encuentre el id de la categoria
        this.responseDto = new ResponseDto();
        
        const category = await Category.findOne({ where : { id } });

        if(!category){

            this.responseDto.message = `Category ${id} not found`;
            this.responseDto.code = 404;

            return this.responseDto;

        }

        this.responseDto.code = 200;
        this.responseDto.data = category;

        return this.responseDto;

    }

    public async create( createCategoryDto: CreateCategoryDto ){

        this.responseDto = new ResponseDto;

        try {

            this.responseDto.data = await Category.create(createCategoryDto);
            this.responseDto.code = 201;
            this.responseDto.message = 'Categoria creada satisfactoriamente';

            return this.responseDto;

        } catch (error) {

            if(error.parent.code === '23505'){

                this.responseDto.code = 400;
                this.responseDto.message = 'Error al crear la categoria, no se puede ingresar una categoria duplicada';

                return this.responseDto;

            }

            this.responseDto.code = 500;
            this.responseDto.message = 'Error al crear la categoria';

            return this.responseDto;

        }

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

        const updatedcategory = await Category.update(updateCategory, {where: { id }});

        return this.getOne(id);
    }

    public async delete( id : number) {

        const category = await Category.findOne({ where : { id } });

        if(!category){
            return null;
        }

        const deteledcategory = await Category.destroy({where : { id }});

        return category;
    }
}

export default new CategoriesService();