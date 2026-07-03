import type { Request,Response,NextFunction } from "express";
import type { Schema } from "zod";

export function validate(schema: Schema,target: "body"|"params"|"query"){
  
    return (req: Request,res:Response,next:NextFunction) =>{
          const result = schema.safeParse(req[target])
          if(result.success === true){
            req[target] = result.data;
            return next();
          }else{
            return res.status(400).json({
                error: "Validatio failed",
                details: result.error.issues
            })
          }
    }
}