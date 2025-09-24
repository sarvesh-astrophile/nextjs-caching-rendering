import React from "react"
import { getData } from "@/app/utils/api-helpers"
import { revalidatePath, revalidateTag } from "next/cache";
import { Product } from "@/app/types/products.types";
import Link from "next/link";

export default async function Page() {
    const products = await getData(
        "http://localhost:8000/products",
        "Static Page",
        {
            next: {
                tags: ["products"],
            },
        }
    );

    async function onRevalidatePathAction() {
        "use server";
        const path = "/data-cache";
        console.log(`attempting to revalidate path: ${path}`);
        revalidatePath(path);
        console.log(`revalidated path: ${path}`);
    }

    async function onRevalidateTagAction() {
        "use server";
        const tag = "products";
        console.log(`attempting to revalidate tag: ${tag}`);
        revalidateTag(tag);
        console.log(`revalidated tag action: (${tag})`);
    }

  return (
    <div>
        <h1 className="font-bold text-4xl">Data Cache - Static Page</h1>
        <div className="mt-6">
            This page is statically rendered in{" "}
            <span className="text-blue-400">build time</span>.
        </div>
        <div className="flex flex-col gap-10 mt-10 border rounded border-zinc-900 p-10">
            <div className="flex gap-6">
                {products.map((product: Product) => (
                    <Link
                    key={product.id}
                    className="flex rounded p-5 text-center gap-6 border-zinc-800 bg-zinc-900 w-4xl h-40 items-center font-bold text-2xl"
                    href={`/data-cache/${product.id}`}
                    >
                        {product.title}
                    </Link>
                ))}
            </div>

        </div>
        <div className="flex gap-6 justify-end mt-10 border rounded border-zinc-900 p-10">
            <Link 
            href="/data-cache/opt-out"
            className="border border-zinc-800 rounded p-3 hover:bg-zinc-900"
            >
                Opt Out demo
            </Link>
            <Link 
            href="/data-cache/time-based-revalidation"
            className="border border-zinc-800 rounded p-3 hover:bg-zinc-900"
            >
                Time Based Revalidation demo
            </Link>
            <form action={onRevalidatePathAction}>
                <button 
                type="submit"
                className="border border-zinc-800 rounded p-3 hover:bg-zinc-900"
                >
                    Revalidate Path
                </button>
            </form>
            <form action={onRevalidateTagAction}>
                <button 
                type="submit"
                className="border border-zinc-800 rounded p-3 hover:bg-zinc-900"
                >
                    Revalidate Tag
                </button>
            </form>
        </div>
    </div>
  )
}