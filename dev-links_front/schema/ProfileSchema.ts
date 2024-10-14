import { z } from "zod";

export const ProfileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  profileImage: z.instanceof(File).optional(),
  links: z
    .array(
      z.object({
        platform: z.string(),
        url: z.string().url("Invalid URL"),
      })
    )
    .optional(),
});

export type ProfileSchemaType = z.infer<typeof ProfileSchema>;
