import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChannelContext } from '../context/ChannelContext';
import VideoPlayer from '../components/VideoPlayer/VideoPlayer';
import ChannelInfo from '../components/ChannelInfo/ChannelInfo';
import ChannelSidebar from '../components/ChannelSidebar/ChannelSidebar';
import ChannelList from '../components/ChannelList/ChannelList';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';
import styles from './Home.module.css';

export default function ChannelPage() {
  const { channelId } = useParams();
  const { channels, setCurrentChannel, loading: contextLoading } = useContext(ChannelContext);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const foundChannel = channels.find(ch => ch.id === parseInt(channelId));

    if (foundChannel) {
      setChannel(foundChannel);
      setCurrentChannel(foundChannel);
      setLoading(false);
    } else if (channels.length > 0 && !contextLoading) {
      setError(`Canal con ID ${channelId} no encontrado`);
      setLoading(false);
    } else if (!contextLoading) {
      setError(`Canal con ID ${channelId} no encontrado`);
      setLoading(false);
    }
  }, [channelId, channels, contextLoading, setCurrentChannel]);

  if (loading || contextLoading) return <LoadingSpinner />;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!channel) return <div className={styles.error}>Canal no encontrado</div>;

  return (
    <div className={styles.home}>
      <div className={styles.mainContent}>
        <div className={styles.playerSection}>
          {channel && (
            <div className={styles.channelBanner}>
              {channel.logo_url && (
                <img src={channel.logo_url} alt={channel.name} className={styles.logo} />
              )}
              <h2 className={styles.channelName}>{channel.name}</h2>
            </div>
          )}
          <VideoPlayer channel={channel} />
          <ChannelInfo channel={channel} />
        </div>
        <aside className={styles.sidebar}>
          <ChannelSidebar />
        </aside>
      </div>

      <div className={styles.mobileList}>
        <ChannelList />
      </div>
    </div>
  );
}
