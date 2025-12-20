import { render, screen } from "@testing-library/react";
import ProductCard from "@/src/components/common/product-card";
import { Provider } from "react-redux";
import store from "@/src/redux/store";

global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve({}) })
) as jest.Mock;

const mockProduct = {
  id: "1",
  _id: "1",
  name: "Test Product",
  slug: "test-product",
  brand: "Test Brand",
  price: 100,
  discountPercentage: 10,
  stock: 3,
  thumbnail: "/test.jpg",
  approximately_delivery_time: "2-3 days",
  coin_per_order: "10",
  variants: [
    {
      _id: "v1",
      regular_price: 120,
      sell_price: 100,
      attribute_values: {},
    },
  ],
};

describe("ProductCard", () => {
  it("renders the product card with correct id", () => {
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    const card = screen.getByTestId("product-card");
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute("id", "product-card");
  });
});

describe("Product Flag", () => {
  it("renders the product fast delivery flag", () => {
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    const flag = screen.getByTestId("fast_delivery");
    expect(flag).toBeVisible();
  });

  it("renders the discount percentage", () => {
    render(
      <Provider store={store}>
        <ProductCard product={mockProduct} />
      </Provider>
    );

    const discountPercentage = screen.getByTestId("discount");
    expect(discountPercentage).toBeVisible();
  });
});
