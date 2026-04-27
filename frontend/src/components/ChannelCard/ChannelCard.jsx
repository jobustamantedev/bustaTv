import styles from './ChannelCard.module.css';

export default function ChannelCard({ channel, isSelected, onSelect }) {
  return (
    <button
      className={`${styles.card} ${isSelected ? styles.selected : ''}`}
      onClick={onSelect}
      aria-pressed={isSelected}
    >
      <div className={styles.content}>
        <div className={styles.liveIndicator}>
          {channel.is_active ? (
            <span className={styles.liveBadge}>EN VIVO</span>
          ) : (
            <span className={styles.offlineBadge}>Offline</span>
          )}
        </div>
        <div className={styles.name}>{channel.name}</div>
        {channel.logo_url && (
          <img src={channel.logo_url} alt={channel.name} className={styles.logo} />
        )}
      </div>
    </button>
  );
}
