import {Router} from "express";
import { JobController } from "../controllers/job.controller.js";
import { validate } from "../validators/create-job.validator.js";
import { createJobSchema } from "../schemas/job.schema.js";

const jobRouter = Router();

const controller = new JobController();

jobRouter.post("/",validate(createJobSchema,"body"),controller.create.bind(controller))

export default jobRouter;
