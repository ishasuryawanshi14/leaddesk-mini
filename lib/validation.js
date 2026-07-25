import { z } from "zod";

export const leadSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  email: z
    .email("Please enter a valid email address"),

  budget: z
    .string()
    .min(1, "Please select a budget"),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters"),
phone: z
  .string()
  .regex(/^[6-9]\d{9}$/, "Enter a valid 10-digit phone number"),
});
