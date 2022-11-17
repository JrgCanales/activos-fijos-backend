import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Router, Request, Response } from "express";
import { CreateCategoryDto } from "../dtos/create-category.dto";
import { UpdateCategoryDto } from "../dtos/update-category.dto";
import categoriesService from "../services/categories.service";

export class CategoriesController {
    router = Router();
 
    constructor(){
        this.initRoutes();
    }

    initRoutes(){
        this.router.get('/categories', this.getList);
        this.router.get('/categories/:id', this.getOne);
        this.router.post('/categories', this.create);
        this.router.patch('/categories/:id', this.update);
        this.router.delete('/categories/:id', this.delete);
    }

    async getList(req: Request, res: Response) : Promise<Response> {
        const categories = await categoriesService.getList();
        return res.json(categories);
    }

    async getOne(req: Request, res: Response) : Promise<Response> {
        const { id } = req.params;
        const category = await categoriesService.getOne(+id);
        return res.json(category);
    }

    async create(req: Request, res: Response) : Promise<Response> {
        const payload = req.body;
        let createCategoryDto = plainToClass(CreateCategoryDto, payload);

        const errors = await validate(createCategoryDto);

        if(errors.length>0){
            console.log(errors);
            return res.status(400).json({
                "Validation-errors": errors
            });
        }

        return res.json(await categoriesService.create(createCategoryDto));
    }

    async update(req: Request, res: Response) : Promise<Response> {
        const { id } = req.params;
        const payload = req.body;

        let updateCategoryDto = plainToClass(UpdateCategoryDto, payload);
        const errors = await validate(updateCategoryDto);

        if(errors.length>0){
            console.log(errors);

            return res.status(400).json({
                "Validation-errors": errors
            });
        }

        let category = await categoriesService.update(payload, +id)
        return res.json(category);
    }

    async delete(req: Request, res: Response) : Promise<Response> {
        const { id } = req.params;

        await categoriesService.delete(+id);
        return res.status(200).json();
    }
}