import { useEffect } from 'react';
import './SpotifyEmbed.css';

const SpotifyEmbed = () => {
  useEffect(() => {
    window.onSpotifyIframeApiReady = (IFrameAPI) => {
      const element = document.getElementById('embed-iframe');
      const options = {
        width: '100%',
        height: '160',
        uri: 'spotify:episode:7makk4oTQel546B0PZlDM5'
      };
      const callback = (EmbedController) => {
        document.querySelectorAll('.episode').forEach(
          episode => {
            episode.addEventListener('click', () => {
              EmbedController.loadUri(episode.dataset.spotifyId)
            });
          })
      };
      IFrameAPI.createController(element, options, callback);
    };
  }, []);

  return (
    <div className="spotify-embed-container">
      <div className="episodes">
        <button className="episode" data-spotify-id="https://open.spotify.com/playlist/44JCfANQkSOJJa9rBUdfmq?si=cfe36c9081114e07">
          Study
        </button>
        <button className="episode" data-spotify-id="https://open.spotify.com/album/14JkAa6IiFaOh5s0nMyMU9?si=T4sNXi9_QvG9tCoxsgpe8w">
          K-POP Demon Hunters Soundtrack
        </button>
      </div>
      <div id="embed-iframe"></div>
      <script src="https://open.spotify.com/embed/iframe-api/v1" async></script>
    </div>
  );
};

export default SpotifyEmbed; 