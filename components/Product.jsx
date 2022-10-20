import styles from "../styles/Home.module.css";
export const Product = ({ product }) => {
  return (
    <article className={styles.card}>
      <img className={styles.productImg} src={product.image} alt={product.name} width={20} height={20} />
      <h4>{product.title}</h4>
      <p>{product.category}</p>
      <p>{product.content}</p>
      <p>{product.url}</p>
    </article>
  );
};
