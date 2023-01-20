import { createTRPCRouter } from "./trpc";
import {departmentRouter} from "./routers/departments"
import { subDepartmentRouter } from "./routers/subdepartments";
import { categoryRouter } from "./routers/categories";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
departments: departmentRouter,
subDepartments: subDepartmentRouter,
category: categoryRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
