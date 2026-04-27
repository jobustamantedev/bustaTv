import { useContext } from 'react';
import { ChannelContext } from '../../context/ChannelContext';
import ChannelCard from '../ChannelCard/ChannelCard';
import styles from './ChannelSidebar.module.css';

export default function ChannelSidebar() {
  const { filteredChannels, currentChannel, setCurrentChannel } = useContext(ChannelContext);

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.title}>Canales</h3>
      <div className={styles.list}>
        {filteredChannels.map((channel) => (
          <ChannelCard
            key={channel.id}
            channel={channel}
            isSelected={currentChannel?.id === channel.id}
            onSelect={() => setCurrentChannel(channel)}
          />
        ))}
      </div>
    </div>
  );
}
