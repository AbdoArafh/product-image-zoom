import "./app.css";
import ProductImage from "./components/ProductImage";

export function App() {
  return (
    <ProductImage
      src="https://picsum.photos/id/50/300/300"
      width={300}
      height={300}
    />
  );
}
