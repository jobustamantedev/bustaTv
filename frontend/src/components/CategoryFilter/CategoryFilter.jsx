import { useContext } from 'react';
import { ChannelContext } from '../../context/ChannelContext';
import styles from './CategoryFilter.module.css';

export default function CategoryFilter() {
  const { categories, activeCategory, setActiveCategory } = useContext(ChannelContext);

  return (
    <div className={styles.filter}>
      <button
        className={`${styles.btn} ${activeCategory === 'all' ? styles.active : ''}`}
        onClick={() => setActiveCategory('all')}
      >
        Todos
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`${styles.btn} ${activeCategory === cat.id ? styles.active : ''}`}
          onClick={() => setActiveCategory(cat.id)}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
