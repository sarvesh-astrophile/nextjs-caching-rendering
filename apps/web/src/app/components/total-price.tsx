import { getData } from "@/app/utils/api-helpers";

export default async function TotalPrice() {
    const products = await getData(
        "http://localhost:8000/products",
        "TotalPrice Component",
        {
            cache: "no-store",
        }
    );
    const totalPrice = products?.reduce((total: number, product: any) => total + product.price, 0);
    return <div>💰 Total price: {totalPrice}</div>;
}