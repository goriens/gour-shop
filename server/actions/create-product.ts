"use server";

import { createSafeActionClient } from "next-safe-action";
import { db } from "..";
import { ProductSchema } from "@/types/product-schema";
import { products } from "../schema";
import { eq } from "drizzle-orm";

const clientAction = createSafeActionClient();

export const createProduct = clientAction
  .schema(ProductSchema)
  .action(async ({ parsedInput: { id, title, description, price } }) => {
    try {
      if (id) {
        const currentProduct = await db.query.products.findFirst({
          where: eq(products.id, id),
        });
        if (!currentProduct) return { error: "Product not found" };
        await db
          .update(products)
          .set({ title, description, price })
          .where(eq(products.id, id))
          .returning();
        return { success: "Product updated successfully" };
      }
      if (!id) {
        await db
          .insert(products)
          .values({ description, price, title })
          .returning();
        return { success: "Product created successfully" };
      }
    } catch (error) {
      return { error: JSON.stringify(error) };
    }
  });
