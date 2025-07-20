import { useGetProductsQuery } from "../../features/products/productApi";
export default function ProductList() {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <div>
      <h1>Product List</h1>
      {isLoading && <div>Loading...</div>}
      {error && (
        <div>
          Error:{" "}
          {typeof error === "object" && error !== null
            ? (error as any)?.data?.message ||
            (error as any)?.status ||
            JSON.stringify(error)
            : "An unknown error occurred"}
        </div>
      )}

      {products && products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>{product.price}</p>
          <p>{product.category}</p>
          <p>{product.stock}</p>
        </div>
      ))}
    </div>
  );
}