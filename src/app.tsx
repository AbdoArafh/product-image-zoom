import "./app.css";
import ProductImage from "./components/ProductImage";

export function App() {
  return (
    <ProductImage
      src="https://picsum.photos/id/1/600/700"
      width={600}
      height={700}
    />
  );
}
