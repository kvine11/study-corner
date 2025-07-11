import { useEffect, useState } from 'react';
import './SpotifyPlayer.css';

function SpotifyPlayer() {
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [deviceId, setDeviceId] = useState(null);
  const [error, setError] = useState(null);

  // You'll need to replace this with your actual token
  const token = 'BQA0Wwl0XKF-_yCEuPtjTz65MOYKF6wcVli-MNDFFk709w43DJv91qfEEWE98CyW_pAGAt8xrRnXZIlanwE58fDwPfeDITeiN1P8xlDVfe497Ae4nmhjowKTCC_0SNLIdIl6xJROsP4xpaGX6Qy0Xy7x81QSeo8WmpIpJvGRe9ZD06IzAApKFNvhuroK4-xrdG1YkRQ4_AkuMEJiYO5FlWAO57GISDfRoUYx8zZ4uss_TR9KEL7JakW_l7IBst4Wa3Gc';

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://sdk.scdn.co/spotify-player.js";
    script.async = true;

    document.body.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      const player = new window.Spotify.Player({
        name: 'Digital Clock Web Player',
        getOAuthToken: cb => { cb(token); },
        volume: 0.5
      });

      setPlayer(player);

      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        setDeviceId(device_id);
        // Transfer playback to this device
        transferPlayback(device_id);
      });

      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
        setError('Player device went offline');
      });

      player.addListener('initialization_error', ({ message }) => {
        console.error('Failed to initialize', message);
        setError('Failed to initialize player: ' + message);
      });

      player.addListener('authentication_error', ({ message }) => {
        console.error('Failed to authenticate', message);
        setError('Authentication failed: ' + message);
      });

      player.addListener('account_error', ({ message }) => {
        console.error('Failed to validate Spotify account', message);
        setError('Premium account required');
      });

      player.addListener('player_state_changed', (state => {
        if (!state) {
          setError('No track is currently playing');
          return;
        }
        
        setCurrentTrack(state.track_window.current_track);
        setIsPlaying(!state.paused);
        setError(null);
      }));

      player.connect();
    };

    return () => {
      if (player) {
        player.disconnect();
      }
    };
  }, [token]);

  const transferPlayback = async (deviceId) => {
    try {
      await fetch('https://api.spotify.com/v1/me/player', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          device_ids: [deviceId],
          play: false,
        }),
      });
    } catch (error) {
      console.error('Error transferring playback:', error);
      setError('Failed to transfer playback to this device');
    }
  };

  const togglePlay = async () => {
    if (!player) return;
    
    try {
      await player.togglePlay();
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error('Error toggling playback:', error);
      setError('Failed to toggle playback');
    }
  };

  const nextTrack = async () => {
    if (!player) return;
    try {
      await player.nextTrack();
    } catch (error) {
      console.error('Error skipping to next track:', error);
      setError('Failed to skip to next track');
    }
  };

  const previousTrack = async () => {
    if (!player) return;
    try {
      await player.previousTrack();
    } catch (error) {
      console.error('Error going to previous track:', error);
      setError('Failed to go to previous track');
    }
  };

  const startPlayback = async () => {
    if (!deviceId) return;

    try {
      await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // You can specify a URI or leave it empty to resume current playback
          // uris: ['spotify:track:YOUR_TRACK_URI']
        }),
      });
    } catch (error) {
      console.error('Error starting playback:', error);
      setError('Failed to start playback');
    }
  };

  return (
    <div className="spotify-player">
      <div className="player-content">
        {error ? (
          <div className="error-message">{error}</div>
        ) : currentTrack ? (
          <div className="track-info">
            <img 
              src={currentTrack.album.images[0].url} 
              alt={currentTrack.name}
              className="album-art"
            />
            <div className="track-details">
              <div className="track-name">{currentTrack.name}</div>
              <div className="artist-name">{currentTrack.artists[0].name}</div>
            </div>
          </div>
        ) : (
          <div className="no-track">No track playing</div>
        )}
        <div className="controls">
          <button 
            className="control-button"
            onClick={previousTrack}
            disabled={!player || !deviceId}
          >
            ⏮️
          </button>
          <button 
            className="play-button" 
            onClick={togglePlay}
            disabled={!player || !deviceId}
          >
            {isPlaying ? '⏸️' : '▶️'}
          </button>
          <button 
            className="control-button"
            onClick={nextTrack}
            disabled={!player || !deviceId}
          >
            ⏭️
          </button>
          {!currentTrack && (
            <button
              className="start-playback"
              onClick={startPlayback}
              disabled={!deviceId}
            >
              Start Playing
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default SpotifyPlayer; 