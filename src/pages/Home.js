import "./Home.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Heart, ShoppingCart } from "react-feather";
import Hero from "../components/Hero";

const productsData = [
  {
    id: 1,
    name: 'Cappuccino "Oryx" blouson',
    desc: "In cashmere, lambskin details",
    price: 6900000,
    img: "/product/product1.jpeg",
    material: "Cashmere",
    color: "Brown",
    size: "L"
  },
  {
    id: 2,
    name: "Pale caramel classic shirt",
    desc: "In cotton",
    price: 1025000,
    img: "/product/product2.jpeg",
    material: "Cotton",
    color: "Beige",
    size: "M"
  },
  {
    id: 3,
    name: 'Cappuccino "Leather stitching" zipped cardigan',
    desc: "In cashmere, lambskin, deerskin",
    price: 1980000,
    img: "/product/product3.jpeg",
    material: "Leather",
    color: "Black",
    size: "XL"
  },
  {
    id: 4,
    name: "Wool navy coat",
    desc: "Elegant winter coat",
    price: 3200000,
    img: "/product/product4.jpeg",
    material: "Wool",
    color: "Navy",
    size: "L"
  },
  {
    id: 5,
    name: "Classic white shirt",
    desc: "Slim fit in cotton",
    price: 890000,
    img: "/product/product1.jpeg",
    material: "Cotton",
    color: "White",
    size: "M"
  },
  {
    id: 6,
    name: "Black lambskin jacket",
    desc: "Premium leather",
    price: 5500000,
    img: "/product/product2.jpeg",
    material: "Leather",
    color: "Black",
    size: "L"
  }
];

const filterOptions = [
  { label: "Material Cotton", value: "Cotton" },
  { label: "Material Leather", value: "Leather" },
  { label: "Color White", value: "White" },
  { label: "Color Black", value: "Black" }
];

function Home() {
  const [filter, setFilter] = useState(null);
  const [liked, setLiked] = useState([]); // simpan id produk yang di-like
  const [cart, setCart] = useState([]);

  const toggleLike = (id) => {
    setLiked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const exists = prev.find((x) => x.id === item.id);
      if (exists) {
        // tambah qty jika sudah ada
        return prev.map((x) =>
          x.id === item.id ? { ...x, qty: x.qty + 1 } : x
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const filteredProducts = filter
    ? productsData.filter(
        (item) =>
          item.material === filter ||
          item.color === filter ||
          item.size === filter
      )
    : productsData;

  return (
    <>
      <Hero />

      {/* Filter Bar */}
      <div className="border-top border-bottom py-3 mb-5">
        <div className="container d-flex align-items-center flex-wrap gap-3">
          <span className="fw-bold me-3">Filter by</span>
          {filterOptions.map((option) => (
            <button
              key={option.value}
              className={`filter-link ${filter === option.value ? "active" : ""}`}
              onClick={() => setFilter(option.value)}
            >
              {option.label}
            </button>
          ))}

          {/* Reset Filter */}
          <button
            className="filter-link text-danger"
            onClick={() => setFilter(null)}
          >
            Clear Filter
          </button>

          <span className="ms-auto text-muted small">
            {filteredProducts.length} products
          </span>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container">
        <div className="row g-5">
          {filteredProducts.map((item) => (
            <div className="col-md-4" key={item.id}>
              <div className="position-relative text-center">
                {/* Floating like button */}
                <button
                  className="btn-like"
                  onClick={() => toggleLike(item.id)}
                >
                  <Heart
                    size={18}
                    fill={liked.includes(item.id) ? "red" : "none"}
                    color={liked.includes(item.id) ? "red" : "black"}
                  />
                </button>

                <img
                  src={item.img}
                  alt={item.name}
                  className="img-fluid mb-3"
                />
                <div className="tag">NEW IN</div>
                <h6 className="fw-bold">{item.name}</h6>
                <p className="text-muted small">{item.desc}</p>
                <p className="fw-bold">
                  {item.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                    minimumFractionDigits: 0,
                  })}
                </p>
                <p className="text-muted small">
                  {item.material} | {item.color} | {item.size}
                </p>
                <div className="mt-auto">
                  <button
                    className="btn btn-dark w-100 d-flex align-items-center justify-content-center gap-2"
                    onClick={() => addToCart(item)}
                  >
                    <ShoppingCart size={16} /> Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Home;