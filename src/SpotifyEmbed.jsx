import { useEffect, useState } from 'react';
import './SpotifyEmbed.css';

const SpotifyEmbed = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://open.spotify.com/embed/iframe-api/v1';
    script.async = true;
    document.body.appendChild(script);

    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const element = document.getElementById('embed-iframe');
      const options = {
        width: '100%',
        height: '160',
      };
      const callback = (EmbedController) => {
        setIsLoading(false);
        document.querySelectorAll('.episode').forEach(
          episode => {
            episode.addEventListener('click', () => {
              EmbedController.loadUri(episode.dataset.spotifyId);
            });
          })
      };
      IFrameAPI.createController(element, options, callback);
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="spotify-embed-container">
      <div className="episodes">
        <button className="episode" data-spotify-id="https://open.spotify.com/playlist/44JCfANQkSOJJa9rBUdfmq?si=cfe36c9081114e07">
          Study Playlist
        </button>
        <button className="episode" data-spotify-id="https://open.spotify.com/album/14JkAa6IiFaOh5s0nMyMU9?si=T4sNXi9_QvG9tCoxsgpe8w">
          K-POP Demon Hunters
        </button>
      </div>
      <div id="embed-iframe" className={isLoading ? 'loading' : ''}>
        {isLoading && <div className="loading-spinner">Loading...</div>}
      </div>
    </div>
  );
};

export default SpotifyEmbed; 