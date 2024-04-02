import Sidebar from "@/components/Sidebar";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Sidebar />

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Stockify</h1>

        <p className={styles.description}>Your ultimate inventory management solution</p>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Stockify. All rights reserved.</p>
      </footer>
    </div>
  );
}
