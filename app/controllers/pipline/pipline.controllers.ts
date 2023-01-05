import {Pipeline} from "../../entities/Pipeline";
import {Request, Response} from 'express';

export const runPipeline =  async (req: Request, res: Response)=>  {
    try {
         new Pipeline(req.body.order)
        return res.status(200).json({ status: 200});
    } catch (e) {
        return res.status(400).json({ status: 400, message: (e as Error).message });
    }
}
