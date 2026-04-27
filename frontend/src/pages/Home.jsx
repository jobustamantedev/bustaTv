import { useContext } from 'react';
import { ChannelContext } from '../context/ChannelContext';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import ChannelSidebar from '../components/ChannelSidebar/ChannelSidebar';
import ChannelInfo from '../components/ChannelInfo/ChannelInfo';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import CategoryFilter from '../components/CategoryFilter/CategoryFilter';
import ChannelList from '../components/ChannelList/ChannelList';
import styles from './Home.module.css';

export default function Home() {
  const { currentChannel, loading, error } = useContext(ChannelContext);

  if (loading) return <LoadingSpinner />;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.home}>
      {/* Layout desktop: player 70% + sidebar 30% */}
      <div className={styles.mainContent}>
        <div className={styles.playerSection}>
          <VideoPlayer channel={currentChannel} />
          <ChannelInfo channel={currentChannel} />
        </div>
        <aside className={styles.sidebar}>
          <CategoryFilter />
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
