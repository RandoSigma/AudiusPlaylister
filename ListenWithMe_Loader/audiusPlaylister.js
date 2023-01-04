/*
HOW THIS WORKS:

1) You must search the Audius catalog by the original URL of the origin playlist in order to find the internal
ID string for that playlist.
2) Once you have that origin ID for the playlist you can then use that to pull a Track List from that playlist.
3) Each track in the Playlist comes with artist AND track ID info.  You must gather whatever you intend from
the set but be aware that Track Internal ID and the Artist Internal ID are both mixed in there.
4) With this information in hand, you can rig up the player interface to pull associated images/title info,links.
5) You can also pull a MP3 stream for playback in the interface by Track ID.

Starting Points: ** look for "id" in the JSON response.

PlayList ID Search:
https://blockchange-audius-discovery-02.bdnodes.net/v1/resolve?url=https://audius.co/strad/playlist/one-world-dream-119912&app_name=LISTENWITHME

PlayList Track list:
https://blockchange-audius-discovery-02.bdnodes.net/v1/playlists/ZZx3E/tracks?app_name=LISTENWITHME
(NOTE: There are Artist ID's also in the results of the previous API call).

Pull Track Item for Playing:
https://blockchange-audius-discovery-02.bdnodes.net/v1/tracks/AKQom/stream?app_name=LISTENWITHME

Dependent API Call Tree

Gather Audius Server List In FETCH block with dependencies. Count and store the URLs for later. All dependent
upon Promised data so nothing else loads without this tree being 100% successful.

TODO: Suggest TO Audius Developers that they provide some sort of Gain Data about audio tracks in their
        API Track Metadata to help with normalizing audio levels of volume during playback.
TODO: Use Browser Built-in WebAudio technology to analyze tracks and normalize gain between them.
TODO: Finalize base color palette.
TODO: Develop base DarkMode color palette.
TODO: Add ListenWithMe Synch display section on UI
TODO: Add API Chat test layer to Twitch
TODO: Add API Chat test layer to Discord
TODO: Add API Chat test layer to Roll20
TODO: Consider version for SoundCloud playlist API (may not work if ad's are inserted)
TODO: Consider version for Youtube Music (using timestamp specs in URL)
TODO: iOS Safari Playback does not work well (needs troubleshooting)
*/

console.log("ListenWithMe starting up...");

// Set your Audius Playlist by the URL to reach the Playlist (examples below)
const jsOriginPlaylist = "https://audius.co/strad/playlist/stradius-menagerie-1972895293"; // <-- CHANGE THIS!
//const jsOriginPlaylist = "https://audius.co/strad/playlist/one-world-synthetic-97265";
//const jsOriginPlaylist = "https://audius.co/strad/playlist/one-world-dream-119912";

// Use Start Volume setting to find a middle ground for your playlist. (Range 0.1 to 1.0)
const jsStartVolume = .1;

const jsSeekPlaylistIdUrl = "/v1/resolve?url=" + jsOriginPlaylist + "&app_name=LISTENWITHME";
const jsPlayList = [{}];

// jsDebug is used to flag additional console.log output if you're debugging the code.
// if it's set to 1 (true) then it will display much more on the browser console.log
const jsDebug = 0; // <-- Change to ZERO for production.

// jsEditMode is intended to hide the loading spinner to help you tinker the HTML layout without waiting.
const jsEditMode = 0; // <-- Change to ZERO for production.
if ( jsEditMode ) {
    document.getElementById('loader-overlay').style.display = 'none';
}

// Full list will be jsAudiusServerList[0-9]
fetch("https://api.audius.co")
    .then((response) => response.json())
    .then((data) => {
    const jsAudiusServerList = data;
    let jsAudiusActiveServer = "";

    // TODO: Test server before continuing.  Loop through available until one works.
    const jsAudiusActiveServers = [];

    if (jsAudiusServerList.data[0].length > 0) {
        let i = 0;
        jsAudiusActiveServer = "";
        for (const server of jsAudiusServerList.data) {
            const found = server.indexOf("cultur3stake");
            if (found < 1) {
                jsAudiusActiveServer = jsAudiusServerList.data[i];
            }
            i = i + 1;
        }
        if ( jsAudiusActiveServer === "" ) {
            throw(error);
        }
    }

    if ( jsDebug ) {
        console.log("Contacting: " + jsAudiusActiveServer);
    }

    // Next Try Pulling Target PlayList Info
    fetch(jsAudiusActiveServer + jsSeekPlaylistIdUrl)
        .then((response) => response.json())
        .then((data) => {
            const jsAudiusSelectedServer = 0;
            const jsAudiusOriginPlaylistRawData = data.data[jsAudiusSelectedServer];

            if ( jsDebug ) {
                console.log(data);
            }

            // Next Pull A List of Tracks and Supporting Info For The List
            const jsAudiusOriginTrackslistUrl = "/v1/playlists/" +  jsAudiusOriginPlaylistRawData["id"] + "/tracks?app_name=LISTENWITHME";
            fetch(jsAudiusActiveServer + jsAudiusOriginTrackslistUrl)
                .then((response) => response.json())
                .then((data) => {
                    const jsAudiusOriginTrackslistRawData = data;
                    let trackCount  = Object.keys(jsAudiusOriginTrackslistRawData.data).length;
                    console.log(trackCount + " tracks found.");
                    if (trackCount > 0) {
                        // Not an empty track list.
                        const jsAudiusTrackList = jsAudiusOriginTrackslistRawData.data;

                        // Creating a playList
                        let playList = [];

                        // Final Refined PlayList
                        let finalPlayList = [];

                        // Stradius: I front-load the playlist with some local fixed data.
                        // Remove this block if you want to modify the results.
                        playList.push({
                            name: 'Listen With Me!',
                            src: jsAudiusActiveServer + '/v1/tracks/JprNo/stream?app_name=LISTENWITHME',
                            artist: 'Stradius',
                            artwork: './s/plugArtwork.png',
                            link: 'https://audius.co/strad'
                        });

                        for (const track of jsAudiusTrackList) {
                            if (jsDebug) {
                                console.log(track);
                            }

                            // Check for Missing Artwork, Use Plug Image Fallback
                            let jsArtwork = "./s/plugArtwork.png";
                            let jsArtObject = ""; // catch and test
                            if (track["artwork"] === null) {
                                jsArtObject = jsArtwork;
                            } else {
                                if (track['artwork']['150x150'] === null) {
                                    jsArtObject = jsArtwork;
                                } else {
                                    jsArtObject = track["artwork"]["150x150"];
                                }
                            }

                            jsArtwork = jsArtObject;
                            playList.push({
                                name: track['title'],
                                src: jsAudiusActiveServer + '/v1/tracks/' + track['id'] + '/stream?app_name=LISTENWITHME',
                                artist: track['user']['name'],
                                artwork: jsArtwork,
                                link: track['permalink']
                            });
                        }
                        finalPlayList = playList;

                        if (jsDebug) {
                            console.log(finalPlayList);
                        }
                        console.log("ListenWithMe: Audius tracks meta-data loading complete.");

                        // Now I have a nice playList array. Time to display it!
                        // Hide The Load Spinner Display
                        document.getElementById('aLoaderOverlay').style.display = 'none';

                        // The WHOLE PLayer starts HERE
                        // Isolated from primary page BUT also dependent upon Fetches and Try/Catches

                        // Establish audioPlayer Controls
                        const audio = new Audio(),
                            aPlay = document.getElementById("aPlay"),
                            aPlayIcoImg = document.getElementById("aPlayIcoImg"),
                            aNow = document.getElementById("aNow"),
                            aTime = document.getElementById("aTime"),
                            aSeek = document.getElementById("aSeek"),
                            aVolume = document.getElementById("aVolume"),
                            aVolIcoImg = document.getElementById("aVolIcoImg"),
                            aList = document.getElementById("aList"),
                            aNowPlayingText = document.getElementById("aNowPlayingText"),
                            aArtworkImg = document.getElementById("aArtworkImg"),
                            cVisualiser = document.getElementById("cVisualiser");

                            // TODO: Add Volume % indicator to right of volbar (0 to 100%)

                            // Populate the List of Tracks in the UI.
                            for (let i in playList) {
                                let row = document.createElement("div");
                                row.className = "aRow";
                                row.innerHTML = playList[i]["name"];
                                row.addEventListener("click", () => { audPlay(i); });
                                playList[i]["row"] = row;
                                aList.appendChild(row);
                            }

                            // Set Default Volume Here
                            audio.volume = jsStartVolume;

                            // Build the Control Mechanisms for Users

                            // Flag current Playing Item
                            let audNow = 0, // current song
                            audStart = true, // auto start next song

                            // TODO: Handle 404 if Track Is Not Found
                            // Advance Now Playing To Current Track
                            audPlay = (idx, nostart) => {
                                audNow = idx;
                                audStart = nostart ? false : true;
                                audio.src = finalPlayList[idx]["src"];
                                // Update User Interface To Reflect Current Info
                                for (let i in finalPlayList) {
                                    if (i == idx) {
                                        finalPlayList[i]["row"].classList.add("now");
                                        aNowPlayingText.innerHTML = finalPlayList[i]["name"] +
                                            '</br> by ' + finalPlayList[i]["artist"];
                                        aArtworkImg.src = finalPlayList[i]["artwork"];
                                        aArtworkImg.alt = "This is artwork";
                                        aArtworkImg.title = "This is artwork";
                                    } else {
                                        finalPlayList[i]["row"].classList.remove("now");
                                    }
                                }
                            };

                            // Start Playback after Track is Buffered
                            audio.addEventListener("canplay", () => {
                                if (audStart) {
                                    console.log(audio);
                                    audio.play();
                                    audStart = false;
                                }
                            });

                            // Autoplay the next song in the playlist.
                            audio.addEventListener("ended", () => {
                                audNow++;
                                if (audNow >= finalPlayList.length) {
                                    audNow = 0;
                                }
                                audPlay(audNow);
                            });

                            // Set the first song.
                            audPlay(0, true);

                            // Play/Pause Button Functionality

                            // Auto-set Play/Pause Text
                            audio.addEventListener("play", () => {
                                aPlayIcoImg.src="./s/btnPause.svg";
                                //aPlayIco.innerHTML = "pause";
                            });
                            audio.addEventListener("pause", () => {
                                aPlayIcoImg.src = "./s/btnPlay.svg";
                                //aPlayIco.innerHTML = "play_arrow";
                            });

                            // Button to Play/Pause
                            aPlay.addEventListener("click", () => {
                                if (audio.paused) {
                                    audio.play();
                                } else {
                                    audio.pause();
                                }
                            });

                            // Track Playback Progress
                            // Format Time Status HH:MM:SS
                            const timeString = (secs) => {
                                // HOURS, MINUTES, SECONDS
                                let ss = Math.floor(secs),
                                    hh = Math.floor(ss / 3600),
                                    mm = Math.floor((ss - (hh * 3600)) / 60);
                                ss = ss - (hh * 3600) - (mm * 60);

                                // Formatted Time
                                if (hh > 0) {
                                    mm = mm < 10 ? "0" + mm : mm;
                                }
                                ss = ss < 10 ? "0" + ss : ss;
                                return hh > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`;
                            };

                        // Setup Track Time
                        audio.addEventListener("loadedmetadata", () => {
                            aNow.innerHTML = timeString(0);
                            aTime.innerHTML = timeString(audio.duration);
                        });

                        // Update Time While Playing
                        audio.addEventListener("timeupdate", () => {
                            aNow.innerHTML = timeString(audio.currentTime);
                        });

                        // Playback Location Bar Tool
                        audio.addEventListener("loadedmetadata", () => {
                            // Make sure max time is at the end of the bar.
                            aSeek.max = Math.floor(audio.duration);

                            // Allow User to Change Location of Playback.
                            let aSeeking = false; // USER IS NOW CHANGING TIME
                            aSeek.addEventListener("input", () => {
                                aSeeking = true; // PREVENTS CLASH WITH (E3)
                            });
                            aSeek.addEventListener("change", () => {
                                audio.currentTime = aSeek.value;
                                if (!audio.paused) {
                                    audio.play();
                                }
                                aSeeking = false;
                            });

                            // Update Playback Bar In Realtime
                            audio.addEventListener("timeupdate", () => {
                                if (!aSeeking) { aSeek.value = Math.floor(audio.currentTime); }
                            });
                        });

                        // Button to Mute
                        let jsPreMuteVolume = 0; // Used to remember previous Vol Level AND tells Mute State

                        // Note we're only changing the AUDIO volume not the UI volume slider.
                        // But we are changing the button on the UI to show "MUTE".
                        aVol.addEventListener("click", () => {
                            if ( jsPreMuteVolume > 0 ) {
                                // Previous Muted Volume Level Detected, Don't Change it!
                                // This means MUTE was in effect. So we're going to UNMUTE
                                aVolIcoImg.src = "./s/btnVol.svg";
                                audio.volume = jsPreMuteVolume;
                                aVolume.value = jsPreMuteVolume;
                                jsPreMuteVolume = 0;
                            } else {
                                // We need to MUTE the volume. Record current Volume for next click event.
                                jsPreMuteVolume = aVolume.value;
                                aVolIcoImg.src = "./s/btnMute.svg";
                                audio.volume = 0;
                            }
                        });

                        // Volume Slider Control -- Adjust UI Accordingly
                        aVolume.addEventListener("change", () => {
                            audio.volume = aVolume.value;
                            if (aVolume.value == 0 ) {
                                aVolIcoImg.src = "./s/btnMute.svg";
                            } else {
                                aVolIcoImg.src = "./s/btnVol.svg";
                                jsPreMuteVolume = 0;
                            }
                        });

                        // Enable/Disable Controls As Required
                        audio.addEventListener("canplay", () => {
                            aPlay.disabled = false;
                            aVolume.disabled = false;
                            aSeek.disabled = false;
                        });

                        audio.addEventListener("waiting", () => {
                            aPlay.disabled = true;
                            aVolume.disabled = true;
                            aSeek.disabled = true;
                        });

                        // Watch For Errors Loading The Final Assets
                        audio.addEventListener('error', () => {
                            // Error accessing Audius Playlist Tracks Data Lists
                            console.log("Error accessing Audius Track Source... moving forward.");
                            // Move Forward On The PlayList
                            audNow++;
                            if (audNow >= finalPlayList.length) {
                                audNow = 0;
                            }
                            audPlay(audNow);
                        });
                    }

                    // TODO: Add retry attempts at each step to deal with the inconsistencies of the Internet
                    }).catch(error => {
                        // Error accessing Audius Playlist Tracks Data Lists
                        if (jsDebug) {
                            alert("Error accessing Audius PlayList Tracks Data.");
                        }
                        console.log("Error accessing Audius Playlist Tracks Data.");
                        throw(error);
                    });
        }).catch(error => {
            // Error accessing Audius PlayList Info
            if (jsDebug) {
                alert("Error accessing Audius PlayList Metadata.");
            }
            console.log("Error accessing Audius PlayList Metadata");
            throw(error);
        });
    }).catch(error => {
        // Error accessing Audius Primary URL
        if (jsDebug) {
            alert("Error accessing Audius Servers.");
        }
        console.log("Error accessing Audius Servers.");
        throw(error);
    });

/* END */