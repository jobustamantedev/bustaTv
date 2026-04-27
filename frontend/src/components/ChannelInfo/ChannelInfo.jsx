import styles from './ChannelInfo.module.css';

export default function ChannelInfo({ channel }) {
  if (!channel) {
    return (
      <div className={styles.info}>
        <h2>Sin seleccionar</h2>
        <p>Selecciona un canal para ver detalles</p>
      </div>
    );
  }

  return (
    <div className={styles.info}>
      <h2>{channel.name}</h2>
      <p className={styles.status}>
        {channel.is_active ? '🔴 EN VIVO' : '⚪ Offline'}
      </p>
    </div>
  );
}
