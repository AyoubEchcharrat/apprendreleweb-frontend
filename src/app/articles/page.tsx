import { NextPage } from "next";
import styles from "../page.module.css"

import Articles from "../../components/articles/Articles";

const BlogIndex:NextPage = () => {
    return (    
    <main className={styles.main}>
        <h1 className={styles.h1}>Tous nos articles :</h1>
        <Articles/>
    </main>
    )
}

export default BlogIndex