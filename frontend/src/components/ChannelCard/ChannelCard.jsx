import styles from './ChannelCard.module.css';

export default function ChannelCard({ channel, isSelected, onSelect, isFavorite, onToggleFavorite }) {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onToggleFavorite?.(channel.id);
  };

  return (
    <button
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={onSelect}
      aria-pressed={isSelected}
    >
      <div className={styles.content}>
        <div className={styles.liveIndicator}>
          <span className={channel.is_active ? styles.online : styles.offline}></span>
        </div>
        <div className={styles.name}>{channel.name}</div>
        {onToggleFavorite && (
          <button
            className={`${styles.favoriteBtn} ${isFavorite ? styles.favoriteActive : ''}`}
            onClick={handleFavoriteClick}
            title={isFavorite ? 'Remover de favoritos' : 'Agregar a favoritos'}
            aria-label={isFavorite ? 'Remover de favoritos' : 'Agregar a favoritos'}
          >
            ★
          </button>
        )}
      </div>
    </button>
  );
}
