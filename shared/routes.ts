import { z } from "zod";

export const InsertEvent = z.object({
    title: z.string(),
    description: z.string(),
    time: z.string(),
    location: z.string(),
    speaker: z.string().optional(),
    imageUrl: z.string().optional(),
});
export type InsertEvent = z.infer<typeof InsertEvent>;

export const InsertRegistration = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    college: z.string(),
    year: z.string(),
    branch: z.string(),
    events: z.array(z.string()),
});
export type InsertRegistration = z.infer<typeof InsertRegistration>;

export const EventSchema = z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    time: z.string(),
    location: z.string(),
    speaker: z.string().optional(),
    imageUrl: z.string().optional(),
});

export const api = {
    events: {
        list: {
            path: "/api/events",
            responses: {
                200: z.array(EventSchema),
            },
        },
        get: {
            path: "/api/events/:id",
            responses: {
                200: EventSchema.nullable(),
            },
        },
    },
    registrations: {
        create: {
            path: "/api/reservations",
            method: "POST" as const,
            input: InsertRegistration,
            responses: {
                201: z.object({ message: z.string() }),
                400: z.object({ message: z.string() }),
            },
        },
    },
};

export function buildUrl(path: string, params: Record<string, any>) {
    let url = path;
    for (const key in params) {
        url = url.replace(`:${key}`, String(params[key]));
    }
    return url;
}
