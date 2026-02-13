import styles from "./styles.module.css";
import DogCard from "../dogCard";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://dog.ceo/api/breeds/image/random";

function DogGallery() {
  const [dogs, setDogs] = useState([]);

  return (
    <div>
      <div className={styles.gallery}>
        {dogs.map((dog, index) => (
          <DogCard key={index} imageUrl={dog} index={index} />
        ))}
      </div>
    </div>
  );
}

export default DogGallery;
