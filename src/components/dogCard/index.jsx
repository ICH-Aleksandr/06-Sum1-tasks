import styles from "./styles.module.css";

function DogCard({ imageUrl, index }) {
  return (
    <img
      src={imageUrl}
      alt={`Собака ${index + 1}`}
      className={styles.dogImage}
    />
  );
}

export default DogCard;
