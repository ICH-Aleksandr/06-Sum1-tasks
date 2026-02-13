import styles from "./styles.module.css";
import DogCard from "../dogCard";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://dog.ceo/api/breeds/image/random";

function DogGallery() {
  const [dogs, setDogs] = useState([]);
  const [isLoadingAdd, setIsLoadingAdd] = useState(false);
  const [isLoadingRefresh, setIsLoadingRefresh] = useState(false);
  const [error, setError] = useState("");

  const fetchDog = async () => {
    const response = await axios.get(API_URL);
    return response.data.message;
  };

  const loadDogs = async (count) => {
    const promises = Array(count)
      .fill(null)
      .map(() => fetchDog());

    return Promise.all(promises);
  };

  useEffect(() => {
    const loadInitial = async () => {
      try {
        setIsLoadingRefresh(true);
        setError("");

        const newDogs = await loadDogs(3);
        setDogs(newDogs);
      } catch (err) {
        setError("Ошибка загрузки фото");
        console.error(err);
      } finally {
        setIsLoadingRefresh(false);
      }
    };

    loadInitial();
  }, []);

  const addDog = async () => {
    try {
      setIsLoadingAdd(true);
      setError("");

      const newDog = await fetchDog();
      setDogs((prev) => [...prev, newDog]);
    } catch (err) {
      setError("Ошибка добавления");
      console.error(err);
    } finally {
      setIsLoadingAdd(false);
    }
  };

  const refreshDogs = async () => {
    try {
      setIsLoadingRefresh(true);
      setError("");

      const newDogs = await loadDogs(dogs.length);
      setDogs(newDogs);
    } catch (err) {
      setError("Ошибка обновления");
      console.error(err);
    } finally {
      setIsLoadingRefresh(false);
    }
  };

  const clearDogs = () => {
    setDogs([]);
    setError("");
  };

  const isAnyLoading = isLoadingAdd || isLoadingRefresh;

  return (
    <div className={styles.container}>
      <h2>Галерея собак</h2>

      <div className={styles.info}>
        <p>
          Загружено собак: {dogs.length} &emsp;
          {isAnyLoading && <span className={styles.loading}>Загрузка...</span>}
        </p>

        {error && <p className={styles.error}>{error}</p>}
      </div>

      <div className={styles.buttons}>
        <button onClick={addDog} disabled={isAnyLoading}>
          {isLoadingAdd ? "Добавление..." : "Добавить собаку"}
        </button>

        <button
          onClick={refreshDogs}
          disabled={isAnyLoading || dogs.length === 0}
        >
          {isLoadingRefresh ? "Обновление..." : "Обновить всё"}
        </button>

        <button
          onClick={clearDogs}
          disabled={dogs.length === 0 || isAnyLoading}
        >
          Очистить все
        </button>
      </div>

      <div className={styles.gallery}>
        {dogs.map((dog, index) => (
          <DogCard key={dog} imageUrl={dog} index={index} />
        ))}
      </div>
    </div>
  );
}

export default DogGallery;
