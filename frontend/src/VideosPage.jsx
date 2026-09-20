import { useEffect, useState } from "react";

function VideosPage() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const API = 'http://localhost:3003'

    useEffect( () => {
        const loadVideos = async () => {
            try {
                const response = await fetch(
                    `${API}/media/videos`
                );

                if (!response.ok) {
                    throw new Error("Failed to load videos");
                }

                const data = await response.json();
                setVideos(data);
            } catch (error) {
                console.error("Failed to load videos:",error);
            } finally {
                setLoading(false);
            }
        };

        loadVideos();
    },[]);

    if (loading) {
        return(
            <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
                Loading videos...
            </div>
        );
    }

    const getMediaUrl = (url) => {
      if (url.startsWith("/uploads")){
        return `${API}${url}`
      }

      return url
    }

    return(
        <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-2">
          😂 Funny Videos
        </h1>

        <p className="text-zinc-400 mb-8">
          Watch something stupid. You deserve it.
        </p>

        {videos.length === 0 ? (
          <div className="text-zinc-500">
            No videos available yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div
                key={video.id}
                className="bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800"
              >
                <video
                  src={getMediaUrl(video.url)}
                  controls
                  preload="metadata"
                  className="w-full aspect-video object-cover"
                />

                <div className="p-4">
                  <h2 className="font-semibold text-lg">
                    {video.title}
                  </h2>

                  {video.category && (
                    <p className="text-sm text-zinc-500 mt-1">
                      #{video.category}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
    );
}


export default VideosPage;
