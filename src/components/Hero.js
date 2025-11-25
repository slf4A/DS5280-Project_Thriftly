import "bootstrap/dist/css/bootstrap.min.css";
import "./Hero.css"

function Hero() {
  return (
    <section className="text-center my-5 hero container">
      <h5 className="fw-bold">FALL 2025</h5>
      <p className="text-muted mx-auto">
        A collection inspired by the raw power of stone and the timeless
        elegance of marble. Each piece blends structure and fluidity,
        precision and softness, creating garments that embody refined
        movement. More than fashion, it’s a unique aesthetic and sensory
        journey.
      </p>
      <img
        src="/hero.jpg"
        alt="Hero Banner"
        className="img-fluid my-4"
      />
    </section>
  );
}

export default Hero;