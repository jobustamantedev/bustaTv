import { useContext } from 'react';
import { ChannelContext } from '../context/ChannelContext';
import { FavoritesContext } from '../context/FavoritesContext';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import ChannelSidebar from '../components/ChannelSidebar/ChannelSidebar';
import ChannelInfo from '../components/ChannelInfo/ChannelInfo';
import FavoriteChannels from '../components/FavoriteChannels/FavoriteChannels';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import ChannelList from '../components/ChannelList/ChannelList';
import styles from './Home.module.css';

export default function Home() {
  const { currentChannel, loading, error } = useContext(ChannelContext);
  const { favorites, toggleFavorite, isFavorite } = useContext(FavoritesContext);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.home}>
      {/* Layout desktop: player 70% + sidebar 30% */}
      <div className={styles.mainContent}>
        <div className={styles.playerSection}>
          {currentChannel && (
            <div className={styles.channelBanner}>
              {currentChannel.logo_url && (
                <img src={currentChannel.logo_url} alt={currentChannel.name} className={styles.logo} />
              )}
              <h2 className={styles.channelName}>{currentChannel.name}</h2>
            </div>
          )}
          <VideoPlayer channel={currentChannel} />
          <ChannelInfo channel={currentChannel} />
          <FavoriteChannels favorites={favorites} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />
        </div>
        <aside className={styles.sidebar}>
          <ChannelSidebar />
        </aside>
      </div>

      {/* Mobile: mostrar ChannelList debajo */}
      <div className={styles.mobileList}>
        <ChannelList />
      </div>
    </div>
  );
}
