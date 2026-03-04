import "./App.css";

function Navbar() {
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <div className="brand">
          <span className="brand__title">Nombre de la página</span>
        </div>

        <nav className="navlinks" aria-label="Navegación principal">
          <a href="#inicio" className="navlinks__item">Inicio</a>
          <a href="#deportes" className="navlinks__item">Deportes</a>
          <a href="#otra-api" className="navlinks__item">Otra API</a>
          <a href="#contacto" className="navlinks__item">Contacto</a>
        </nav>

        <div className="auth">
          <button className="auth__btn auth__btn--ghost" type="button">Login</button>
          <button className="auth__btn" type="button">Logout</button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="hero">
      <div className="hero__inner">
        <div className="hero__left">
          <h1 className="hero__headline">Texto sobre nosotros</h1>

          <p className="hero__text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </p>

          <p className="hero__text">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum. Curabitur pretium tincidunt lacus. Nulla gravida orci a
            odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus
            magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida.
          </p>

          <p className="hero__text hero__text--last">
            Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor.
            Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien
            risus a quam. Maecenas fermentum consequat mi. Donec fermentum.
          </p>

          <div className="hero__cta">
            <button className="btn" type="button">Ver deportes</button>
            <button className="btn btn--outline" type="button">Contacto</button>
          </div>
        </div>

        <div className="hero__right">
          <div className="hero__image" role="img" aria-label="Imagen de ejemplo">
            Imagen
          </div>
        </div>
      </div>
    </section>
  );
}

function Cards() {
  const items = [
    {
      title: "Misión",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio."
    },
    {
      title: "Visión",
      text: "Praesent libero. Sed cursus ante dapibus diam. Sed nisi."
    },
    {
      title: "Valores",
      text: "Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum."
    },
  ];

  return (
    <section className="cards" aria-label="Sección de misión, visión y valores">
      <div className="cards__header">
        <h2 className="cards__title">Nuestra esencia</h2>
        <p className="cards__subtitle">
          Conoce lo que nos mueve, hacia dónde vamos y en qué creemos.
        </p>
      </div>

      <div className="cards__inner">
        {items.map((it) => (
          <article key={it.title} className="card">
            <div className="card__icon" aria-hidden="true">[icono]</div>
            <h3 className="card__title">{it.title}</h3>
            <p className="card__text">{it.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="page">
      <Navbar />
      <main className="main">
        <Hero />
        <Cards />
      </main>

      <footer id="contacto" className="footer">
        <div className="footer__inner">
          <span>© {new Date().getFullYear()} ApuestasApp</span>
          <span className="footer__muted">Contacto: correo@ejemplo.com</span>
        </div>
      </footer>
    </div>
  );
}