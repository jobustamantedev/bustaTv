import { useContext } from 'react';
import { ChannelContext } from '../../context/ChannelContext';
import ChannelCard from '../ChannelCard/ChannelCard';
import styles from './ChannelList.module.css';

export default function ChannelList() {
  const { filteredChannels, currentChannel, setCurrentChannel } = useContext(ChannelContext);

  return (
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
  );
}
