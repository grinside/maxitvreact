import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Hls from 'hls.js';

function VideoFeed() {
  const [videos, setVideos] = useState([]);
  const containerRef = useRef(null);
  const videoRefs = useRef({});

  const loadVideo = (videoEl, url) => {
    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(url);
      hls.attachMedia(videoEl);
      hls.on(Hls.Events.MANIFEST_PARSED, () => videoEl.play());
    } else if (videoEl.canPlayType('application/vnd.apple.mpegurl')) {
      videoEl.src = url;
      videoEl.addEventListener('loadedmetadata', () => videoEl.play());
    }
  };

  useEffect(() => {
    fetch('/data.json')
      .then(res => res.json())
      .then(data => setVideos(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleScroll = (e) => {
      const direction = Math.sign(e.deltaY);
      const container = containerRef.current;
      const children = container.children;
      const currentIndex = Math.round(container.scrollTop / window.innerHeight);

      if (direction > 0 && currentIndex < children.length - 1) {
        gsap.to(container, { scrollTop: children[currentIndex + 1].offsetTop, duration: 0.5 });
      } else if (direction < 0 && currentIndex > 0) {
        gsap.to(container, { scrollTop: children[currentIndex - 1].offsetTop, duration: 0.5 });
      }
    };

    const container = containerRef.current;
    container.addEventListener('wheel', handleScroll);
    return () => container.removeEventListener('wheel', handleScroll);
  }, []);

  return (
    <div className="flux-container" ref={containerRef}>
      {videos.map((video) => (
        <div className="flux" key={video.id} data-video-id={video.id}>
          <div className="video-wrapper">
            <video
              ref={(el) => {
                videoRefs.current[video.id] = el;
                if (el) loadVideo(el, video.url);
              }}
              muted
              playsInline
              controls
            />
            <div className="comments">
              <CommentFeed />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function CommentFeed() {
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const interval = setInterval(() => {
      setComments((prev) => [...prev.slice(-4), `🔥 MaxiFan ${Math.random().toFixed(4)}`]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <>
      {comments.map((text, idx) => (
        <div className="comment" key={idx}>{text}</div>
      ))}
    </>
  );
}

export default VideoFeed;