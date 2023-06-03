import "./app.css";
import ProductImage from "./components/ProductImage";

export function App() {
  return (
    <div class="wrapper">
      <ProductImage
        src="https://picsum.photos/id/50/300/300"
        width={300}
        height={300}
      />
      <div class="text">
        <h3 class="title">Lorem, ipsum dolor.</h3>
        <span class="price">
          $49<small>.99</small>
        </span>
      </div>
    </div>
  );
}
