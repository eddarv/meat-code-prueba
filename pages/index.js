import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { MediaBtn } from "../components/MediaBtn";
import { SubcriptionForm } from "../components/SubcriptionForm";
import { useState, useEffect } from "react";
import { Product } from "../components/Product";
const axios = require("axios");

export default function Home() {
  const [filter, setFilter] = useState("Todos");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filtres, setFiltres] = useState(["Todos"]);

  const getProducts = async () => {
    axios
      .get(
        "https://5eed24da4cbc340016330f0d.mockapi.io/api/articles?limit=" +
          filter
      )
      .then((resp) => {
        setProducts(resp.data);
        
        const category = resp.data.map((product) => product.category);

        setFiltres(["Todos", ...new Set(category)]);
        // esto es para inicializar el array de productos filtrados        
        updateFilteredProducts(resp.data, filter);
      })
      .catch((err) => {
        setProducts([]);
        console.log(err);
      });
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);

    updateFilteredProducts(products, e.target.value);   
  };

  // para actualizar el array de productos filtrados evitando problemas de asyncronidad
  const updateFilteredProducts = (_products, _filter) => {
    if (filter === "Todos") {
      setFilteredProducts(_products);
    } else {
      setFilteredProducts(
        _products.filter((product) => product.category === _filter)
      );
    }
  };

  useEffect(() => {    
    getProducts();
  }, [filter]);

  return (
    <div>
      <Head>
        <title>Prueba Front-End</title>
        <meta name="description" content="Prueba de front end para meatcode" />
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Open+Sans&display=swap" rel="stylesheet"/>
      </Head>

      <header className={styles.heroImage}>
        <div className={`${styles.decorationImage} ${styles.flexRowElement1}`}>
          <h2 className={styles.flexColumnElement}>Logo</h2>

          <section className={styles.flexColumnElement2}>
            <h1 className={`col-6 ${styles.heroTitle}`}>
              El secreto de tu cocina
            </h1>
          </section>

          <div className={styles.flexColumnElement2}></div>
        </div>

        <div className={styles.flexRowElement2}>
          <nav className={styles.socialMedia}>
            <MediaBtn src="/facebook.svg" alt="fb-logo" href="https://www.facebook.com"/>
            <MediaBtn src="/instagram.svg" alt="ig-logo" href="https://www.instagram.com"/>
            <MediaBtn src="/youtube.svg" alt="yt-logo" href="https://www.youtube.com"/>
          </nav>
        </div>
      </header>

      <main className="">

      <section className={`${styles.sectionTitle}`}>
        <h3>Nuestros artículos</h3>
      </section>

      <section className={styles.cardContainer}>

        <nav className={styles.menu}>
          <ul>
            {filtres.map((filtre) => (
              <li key={filtre}>
                <button
                  className={`${styles.btn} ${
                    filtre === filter ? styles.active : ""
                  }`}
                  value={filtre}
                  onClick={handleFilter}
                >
                  {filtre}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {filteredProducts === [] ? (
          <p>No hay productos</p>
        ) : (
          filteredProducts.map((product) => (
            <Product key={product.id} product={product} />
          ))
        )}

        </section>


          

      </main>

      <footer className={`${styles.footer}`}>
      
        <section className={`${styles.sectionTitle} ${styles.contactanos}`}>
          <h3>Contáctanos</h3>
        </section>
        
        <SubcriptionForm />
      </footer>
    </div>
  );
}
