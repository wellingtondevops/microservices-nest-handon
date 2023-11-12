import { HttpService } from '@nestjs/axios';
import { Controller, Get,Post,Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';


@Controller('products')
export class ProductController {

    constructor(
        private productService: ProductService,
        private httpService: HttpService
        ) {

    }
    @Get()
    async all() {

        return this.productService.all()

    }

    @Post(':id/like')
    async like(@Param('id') id: number) {
      const product = await this.productService.findOne(id);
    
      if (product) {
        const updatedProduct = await this.productService.update(id, {
          likes: product.likes + 1,
        });

        await this.httpService.post(`http://localhost:8000/api/products/${id}/like`, {}).subscribe()
        return updatedProduct;
      } else {
        
        return { message: 'Produto não encontrado.' };
      }
    }
    
    @EventPattern('product_created')
    async productCreated(product: any) {


        await this.productService.create({
            id: product.id,
            title: product.title,
            image: product.image,
            likes: product.likes,

        })

    }


    @EventPattern('product_updated')
    async productUpdated(product: any) {

        await this.productService.update(product.id, {
            id: product.id,
            title: product.title,
            image: product.image,
            likes: product.likes
        })

    }

    @EventPattern('product_deleted')
    async producDeleted(id: number) {

        await this.productService.delete(id)

    }


}
