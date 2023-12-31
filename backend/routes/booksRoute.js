import  express  from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();


router.post('/',async (request,response)=>{
    try {
        const newBook = {title: request.body.title,
                         author: request.body.author,
                         price: request.body.price,
        };

        const book = await Book.create(newBook);

        return response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
    }
})

router.get('/',async(request,response)=>{
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books,
          });
    } catch (error) {
        console.log(error.message);
    }
});

router.get('/:id',async(request,response)=>{
    try {

        const {id}=request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
    }
});

router.put('/:id',async(request,response)=>{
    try {
        
        const {id} = request.params;

        const result = await Book.findByIdAndUpdate(id,request.body);

        return response.status(200).send({message:'book updated'});

    } catch (error) {
        console.log(error.message);
    }
});


router.delete('/:id',async (request,response)=>{
    try {
        
        const {id} = request.params;

        const result = await Book.findByIdAndDelete(id);

        return response.status(200).send({message:'book deleted'});

    } catch (error) {
        console.log(error.message);
    }
});

export default router;