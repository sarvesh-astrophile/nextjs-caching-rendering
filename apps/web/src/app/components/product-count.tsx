import { getData } from "../utils/api-helpers";

export default async function ProductCount() {
    const products = await getData(
        "http://localhost:8000/products",
        "ProductCount Component",
    );
    const productCount = products?.length || 0;

    return <div>🗳️ {productCount} products</div>;
}