import { useState, useEffect } from "react";

const API = "http://localhost:3003"

function Admin() {
  const [type, setType] = useState("AUDIO");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [mediaList, setMediaList] = useState([]);
  const audioList = mediaList.filter((media) => media.type === "AUDIO");
  const videoList = mediaList.filter((media) => media.type === "VIDEO");
  const [bindings, setBindings] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showKeySelector, setShowKeySelector] = useState(false);


  const deleteMedia = async (mediaId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this media?"
    );

    if (!confirmed) return;

    try {
      const response = await fetch(`${API}/media/${mediaId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete media");
      }

      await loadMedia();
      await loadBindings();
    } catch (error) {
      console.error("Failed to delete media:", error);
      alert("Failed to delete media.");
    }
  };

  const removeBinding = async (bindingId) => {
    try {
      const response = await fetch(`${API}/bindings/${bindingId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to remove binding");
      }

      await loadBindings();
    } catch (error) {
      console.error("Failed to remove binding:", error);
      alert("Failed to remove key.");
    }
  };

  const assignKey = async (key) => {
    if (!selectedMedia) return;

    try {
      const response = await fetch(`${API}/bindings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          key,
          mediaId: selectedMedia.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to assign key");
      }

      await loadBindings();

      setShowKeySelector(false);
      setSelectedMedia(null);

    } catch (error) {
      console.error("Failed to assign key:", error);
      alert("Failed to assign key.");
    }
  };

  const openKeySelector = (media) => {
    setSelectedMedia(media);
    setShowKeySelector(true);
  };

  const loadBindings = async () => {
    try {
      const response = await fetch(`${API}/bindings`);

      if (!response.ok) {
        throw new Error("failed to load bindings");
      }

      const data = await response.json();
      setBindings(data);
    } catch (error) {
      console.error("Failed to load bindings : ", error);
    }
  };

  const loadMedia = async () => {
    try {
      const response = await fetch(`${API}/media`);

      if (!response.ok) {
        throw new Error("Failed to load media");
      }

      const data = await response.json();

      setMediaList(data);

    } catch (error) {
      console.error("Failed to load media: ", error);
    }
  };

  useEffect(() => {
    loadMedia();
    loadBindings();
  }, []);

  const getAssignedKeys = (mediaId) => {
    return bindings.filter((binding) => binding.mediaId === mediaId).map((binding) => binding.key);
  };

  const handleUpload = async () => {
    if (!title || !file) {
      alert("Please enter a title and select a file.");
      return;
    }

    const formData = new FormData();

    formData.append("title", title);
    formData.append("type", type);
    formData.append("category", category);
    formData.append("file", file);

    try {
      const response = await fetch(
        `${API}/media/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      console.log("Uploaded:", data);

      alert("Media uploaded successfully!");

      await loadMedia();

      setTitle("");
      setCategory("")
      setFile(null);
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    }
  };

  const getMediaUrl = (url) => {
    if (url.startsWith("/uploads")) {
      return `${API}${url}`
    }

    return url
  }



  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-3xl font-bold">
          ⚙️ FunnyDeck Admin
        </h1>

        <p className="text-zinc-400 mt-2 mb-8">
          Add and manage your funny media.
        </p>

        {/* Add Media */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

          <h2 className="text-xl font-semibold mb-6">
            Add Media
          </h2>

          {/* Media Type */}
          <div className="mb-5">
            <label className="block text-sm text-zinc-400 mb-2">
              Media Type
            </label>

            <div className="flex gap-3">
              <button
                onClick={() => setType("AUDIO")}
                className={`px-5 py-2 rounded-lg ${type === "AUDIO"
                  ? "bg-white text-black"
                  : "bg-zinc-800 text-zinc-300"
                  }`}
              >
                🔊 Audio
              </button>

              <button
                onClick={() => setType("VIDEO")}
                className={`px-5 py-2 rounded-lg ${type === "VIDEO"
                  ? "bg-white text-black"
                  : "bg-zinc-800 text-zinc-300"
                  }`}
              >
                🎬 Video
              </button>
            </div>
          </div>

          {/* Title */}
          <div className="mb-5">
            <label className="block text-sm text-zinc-400 mb-2">
              Title
            </label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Example: Bruh Sound"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 outline-none focus:border-zinc-500"
            />
          </div>

          {/* Category */}
          <div className="mb-5">
            <label className="block text-sm text-zinc-400 mb-2">
              Category
            </label>

            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Example: reaction"
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 outline-none focus:border-zinc-500"
            />
          </div>

          {/* File */}
          <div className="mb-6">
            <label className="block text-sm text-zinc-400 mb-2">
              {type === "AUDIO" ? "Audio File" : "Video File"}
            </label>

            <input
              type="file"
              accept={
                type === "AUDIO"
                  ? "audio/*"
                  : "video/*"
              }
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-zinc-400"
            />
          </div>

          <button
            className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-zinc-200"
            onClick={handleUpload}
          >
            {type === "AUDIO"
              ? "Upload Audio"
              : "Upload Video"}
          </button>

        </div>

      </div>

      {/* display AUDIO media */}

      <div className="mt-10">
        <div className="mb-5 flex items-center gap-3">
          <span className="text-2xl">🔊</span>

          <div>
            <h2 className="text-2xl font-bold">
              Audio Library
            </h2>

            <p className="text-sm text-zinc-500">
              Sounds assigned to keyboard keys
            </p>
          </div>
        </div>

        {audioList.length === 0 ? (
          <p className="text-zinc-500">
            No audio uploaded yet.
          </p>
        ) : (
          <div className="grid gap-4">
            {audioList.map((media) => (
              <div
                key={media.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <div className="flex items-center justify-between gap-4">

                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">
                      {media.title}
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                      {media.category || "Uncategorized"}
                    </p>
                  </div>

                  <audio
                    src={getMediaUrl(media.url)}
                    controls
                    className="w-64"
                  />
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-4">
                  <div>
                    <p className="mb-2 text-xs text-zinc-500">
                      Assigned keys
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {bindings.filter((binding) => binding.mediaId === media.id).length === 0 ? (
                        <span className="text-sm text-zinc-600">
                          No keys assigned
                        </span>
                      ) : (
                        bindings
                          .filter((binding) => binding.mediaId === media.id)
                          .map((binding) => (
                            <button
                              key={binding.id}
                              onClick={() => removeBinding(binding.id)}
                              className="flex h-8 min-w-8 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800 px-2 text-sm font-bold hover:border-red-500 hover:bg-red-500/10 hover:text-red-400"
                              title={`Remove ${binding.key}`}
                            >
                              {binding.key} ×
                            </button>
                          ))
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openKeySelector(media)}
                      className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
                    >
                      Assign Key
                    </button>

                    <button
                      onClick={() => deleteMedia(media.id)}
                      className="rounded-lg border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showKeySelector && selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-zinc-800 bg-zinc-950 p-6">

            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">
                  Assign Key
                </h2>

                <p className="mt-1 text-sm text-zinc-500">
                  {selectedMedia.title}
                </p>
              </div>

              <button
                onClick={() => setShowKeySelector(false)}
                className="text-xl text-zinc-500 hover:text-white"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-7 gap-3">
              {[
                "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
                "A", "S", "D", "F", "G", "H", "J", "K", "L",
                "Z", "X", "C", "V", "B", "N", "M"
              ].map((key) => (
                <button
                  key={key}
                  onClick={() => assignKey(key)}
                  className="rounded-xl border border-zinc-700 bg-zinc-900 py-4 text-lg font-bold transition hover:border-white hover:bg-zinc-800"
                >
                  {key}
                </button>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* display VIDEO section */}

      <div className="mt-14">
        <div className="mb-5 flex items-center gap-3">
          <span className="text-2xl">🎬</span>

          <div>
            <h2 className="text-2xl font-bold">
              Video Library
            </h2>

            <p className="text-sm text-zinc-500">
              Funny videos assigned to keyboard keys
            </p>
          </div>
        </div>

        {videoList.length === 0 ? (
          <p className="text-zinc-500">
            No videos uploaded yet.
          </p>
        ) : (
          <div className="grid gap-4">
            {videoList.map((media) => (
              <div
                key={media.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-5"
              >
                <div className="flex gap-5">

                  <video
                    src={getMediaUrl(media.url)}
                    controls
                    preload="metadata"
                    className="h-32 w-56 rounded-lg object-cover"
                  />

                  <div className="flex flex-1 flex-col justify-center">
                    <h3 className="text-lg font-semibold">
                      {media.title}
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                      {media.category || "Uncategorized"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-4">
                  <div>
                    <p className="mb-2 text-xs text-zinc-500">
                      Assigned keys
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {bindings.filter((binding) => binding.mediaId === media.id).length === 0 ? (
                        <span className="text-sm text-zinc-600">
                          No keys assigned
                        </span>
                      ) : (
                        bindings
                          .filter((binding) => binding.mediaId === media.id)
                          .map((binding) => (
                            <button
                              key={binding.id}
                              onClick={() => removeBinding(binding.id)}
                              className="flex h-8 min-w-8 items-center justify-center rounded-md border border-zinc-700 bg-zinc-800 px-2 text-sm font-bold hover:border-red-500 hover:bg-red-500/10 hover:text-red-400"
                              title={`Remove ${binding.key}`}
                            >
                              {binding.key} ×
                            </button>
                          ))
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => openKeySelector(media)}
                      className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black hover:bg-zinc-200"
                    >
                      Assign Key
                    </button>

                    <button
                      onClick={() => deleteMedia(media.id)}
                      className="rounded-lg border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>



    </div>
  );
}

export default Admin;