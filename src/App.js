import React from 'react';
import VideoFeed from './components/VideoFeed';

function App() {
  return (
    <div className="container">
      <VideoFeed />
      <nav className="bottom-nav">
        <ul>
          <li><a href="#"><span className="icon">🏠</span><span className="text">Accueil</span></a></li>
          <li><a href="#"><span className="icon">📺</span><span className="text">En direct</span></a></li>
          <li><a href="#"><span className="icon">📱</span><span className="text">Maxit</span></a></li>
          <li><a href="#"><span className="icon">🔍</span><span className="text">Explorer</span></a></li>
          <li><a href="#"><span className="icon">👤</span><span className="text">Mon profil</span></a></li>
        </ul>
      </nav>
    </div>
  );
}

export default App;