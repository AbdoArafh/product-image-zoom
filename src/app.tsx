import "./app.css";
import ProductImage from "./components/ProductImage";

export function App() {
  return (
    <ProductImage
      src="https://picsum.photos/200/300"
      width={200}
      height={300}
    />
  );
}
