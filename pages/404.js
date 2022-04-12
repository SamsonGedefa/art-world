// replaces next/js 404 error pages
import styles from "../styles/Error.module.css";
import Link from "next/link";
import { HiHome } from "react-icons/hi";


export default function Custom404() {
    return (
        <div className={styles.container}>
            <h1 className={styles.bold}>404 - Page Not Found</h1>
            <Link href="/">
                <a className={styles.return}><HiHome/>Back to Home</a>
            </Link>
        </div>

    )
  }