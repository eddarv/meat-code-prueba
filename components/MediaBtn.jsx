
import Image from "next/image";
import styles from "../styles/Home.module.css";

export const MediaBtn = ({src, alt, href}) => {
  return (
    <a href={href} className={`${styles.mediabtn}`} target="_blank">
      <Image src={src} alt={alt} className="" width={25} height={25} />
    </a>
  )
}
