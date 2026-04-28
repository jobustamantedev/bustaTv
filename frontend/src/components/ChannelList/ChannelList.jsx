import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChannelContext } from '../../context/ChannelContext';
import { FavoritesContext } from '../../context/FavoritesContext';
import ChannelCard from '../ChannelCard/ChannelCard';
import styles from './ChannelList.module.css';

export default function ChannelList() {
  const navigate = useNavigate();
  const { filteredChannels, currentChannel } = useContext(ChannelContext);
  const { toggleFavorite, isFavorite } = useContext(FavoritesContext);

  const handleSelectChannel = (channel) => {
    navigate(`/channel/${channel.id}`);
  };

  return (
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
  );
}
