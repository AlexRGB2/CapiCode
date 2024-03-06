document.addEventListener("DOMContentLoaded", function () {
  // Modo Oscuro
  let btn = document.getElementById("darkBtn");
  if (
    localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
    btn.checked = false;
  } else {
    document.documentElement.classList.remove("dark");
    btn.checked = true;
  }

  document
    .querySelector(".switch > input")
    ?.addEventListener("click", function (event) {
      // if set via local storage previously
      if (localStorage.getItem("color-theme")) {
        if (localStorage.getItem("color-theme") === "light") {
          document.documentElement.classList.add("dark");
          localStorage.setItem("color-theme", "dark");
        } else {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("color-theme", "light");
        }

        // if NOT set via local storage previously
      } else {
        if (document.documentElement.classList.contains("dark")) {
          document.documentElement.classList.remove("dark");
          localStorage.setItem("color-theme", "light");
        } else {
          document.documentElement.classList.add("dark");
          localStorage.setItem("color-theme", "dark");
        }
      }
    });

  const imagen = document.getElementById("cursos");
  const cargarImagen = (entradas, observador) => {
    entradas.forEach((entrada) => {
      if (entrada.isIntersecting) {
        entrada.target.classList.add("visible");
      } else {
        entrada.target.classList.remove("visible");
      }
    });
  };

  const observador = new IntersectionObserver(cargarImagen, {
    root: null,
    rootMargin: "0px 0px 0px 0px",
    threshold: 0.3,
  });

  observador.observe(imagen);
});
