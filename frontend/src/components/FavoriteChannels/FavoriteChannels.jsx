import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChannelContext } from '../../context/ChannelContext';
import ChannelCard from '../ChannelCard/ChannelCard';
import styles from './FavoriteChannels.module.css';

export default function FavoriteChannels({ favorites, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();
  const { channels, currentChannel } = useContext(ChannelContext);

  const favoriteChannels = channels.filter(ch => favorites.includes(ch.id));

  const handleSelectChannel = (channel) => {
    navigate(`/channel/${channel.id}`);
  };

  return (
    <div className={styles.favoriteSection}>
      <h3 className={styles.title}>⭐ Mis Favoritos ({favoriteChannels.length})</h3>
      {favoriteChannels.length === 0 ? (
        <div className={styles.empty}>
          <p>Aún no tienes favoritos.</p>
          <p className={styles.hint}>Haz clic en la ⭐ en cualquier canal para agregarlo.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {favoriteChannels.map((channel) => (
            <ChannelCard
              key={channel.id}
              channel={channel}
              isSelected={currentChannel?.id === channel.id}
              onSelect={() => handleSelectChannel(channel)}
              isFavorite={isFavorite(channel.id)}
              onToggleFavorite={onToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
