import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChannelContext } from '../../context/ChannelContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import ChannelCard from '../ChannelCard/ChannelCard';
import styles from './ChannelSidebar.module.css';

export default function ChannelSidebar() {
  const navigate = useNavigate();
  const { channels, filteredChannels, currentChannel, searchQuery, setSearchQuery } = useContext(ChannelContext);
  const { favorites, toggleFavorite, isFavorite } = useContext(FavoritesContext);

  const favoriteChannels = channels.filter(ch => favorites.includes(ch.id));

  const handleSelectChannel = (channel) => {
    navigate(`/channel/${channel.id}`);
  };

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.title}>Canales</h3>

      <input
        type="text"
        placeholder="Buscar canal..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className={styles.searchInput}
      />

      {favoriteChannels.length > 0 && (
        <>
          <div className={styles.favoritesSection}>
            <h4 className={styles.favoritesTitle}>FAVORITOS</h4>
            <div className={styles.listFavorites}>
              {favoriteChannels.map((channel) => (
                <ChannelCard
                  key={channel.id}
                  channel={channel}
                  isSelected={currentChannel?.id === channel.id}
                  onSelect={() => handleSelectChannel(channel)}
                  isFavorite={isFavorite(channel.id)}
                  onToggleFavorite={toggleFavorite}
                />
              ))}
            </div>
          </div>
          <div className={styles.divider} />
        </>
      )}

      <h4 className={styles.allChannelsTitle}>TODOS LOS CANALES</h4>
      <div className={styles.list}>
        {filteredChannels.map((channel) => (
          <ChannelCard
            key={channel.id}
            channel={channel}
            isSelected={currentChannel?.id === channel.id}
            onSelect={() => handleSelectChannel(channel)}
            isFavorite={isFavorite(channel.id)}
            onToggleFavorite={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
