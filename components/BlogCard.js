import Link from 'next/link'
import styles from '../styles/BlogCard.module.css'

export default function BlogCard ({title, author, coverPhoto, datePublished, slug}) {
  return (
    <div className={styles.card}>
      <Link href={'/posts/' + slug}>
        <div className={styles.imgContainer}>
          <img src={coverPhoto?.url} alt="" />
        </div>
      </Link>
      <div className={styles.text}>
        <h2> {title} &#8594; </h2>
        <div className={styles.details}>
          <div className={styles.author}>
            <h3> {author?.name}</h3>
          </div>
          <div className={styles.date}>
            <h3> {datePublished} </h3>
          </div>
        </div>
      </div>
    </div>
  )
}