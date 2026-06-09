import { useState, useRef, useEffect } from 'react'
import * as Tone from 'tone'

// ─── Audio imports ────────────────────────────────────────────────────────────
// Vite resolves these to hashed public URLs at build time.
import blueUrl         from '../assets/audio-portfolio/blue.mp3'
import charlieUrl      from '../assets/audio-portfolio/charlie.mp3'
import url2015         from '../assets/audio-portfolio/2015.mp3'
import montrealUrl     from '../assets/audio-portfolio/montreal.mp3'
import bleugrooveUrl   from '../assets/audio-portfolio/bleugroove.mp3'
import bummersummerUrl from '../assets/audio-portfolio/bummersummer.mp3'
import lactoseUrl      from '../assets/audio-portfolio/lactose.mp3'

import './AudioPlayer.css'

// ─── Track data ───────────────────────────────────────────────────────────────
const TRACKS = [
  {
    id: 'blue',
    title: 'blue',
    src: blueUrl,
    tags: ['chill', 'guitars', 'indie-rock', 'tape', 'vocals'],
  },
  {
    id: 'lactose',
    title: 'lactose',
    src: lactoseUrl,
    tags: ['indie-rock', 'singer-songwriter', 'vocals', 'guitars', 'piano'],
  },
  {
    id: 'charlie',
    title: 'charlie',
    src: charlieUrl,
    tags: ['groove', 'synths', 'indie-rock', 'lo-fi', 'vocals'],
  },
  {
    id: '2015',
    title: '2015',
    src: url2015,
    tags: ['groove', 'synths', '80s inspired', 'electronic', 'chill'],
  },
  {
    id: 'montreal',
    title: 'montreal',
    src: montrealUrl,
    tags: ['trap groove', 'synths', 'electronic', 'chill'],
  },
  {
    id: 'bleugroove',
    title: 'bleugroove',
    src: bleugrooveUrl,
    tags: ['electronic', 'sampling', 'hip-hop'],
  },
  {
    id: 'bummersummer',
    title: 'bummer summer',
    src: bummersummerUrl,
    tags: ['upbeat', 'indie-rock', 'guitars', 'vocals'],
  },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function fmt(secs) {
  if (!isFinite(secs) || secs < 0) return '0:00'
  const m   = Math.floor(secs / 60)
  const sec = Math.floor(secs % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

// ─── Icons ────────────────────────────────────────────────────────────────────
const PlayIcon = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor" aria-hidden="true">
    <path d="M2 0.8v9.4L9.6 5.5 2 0.8z" />
  </svg>
)

const PauseIcon = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="currentColor" aria-hidden="true">
    <rect x="1.5" y="0.8" width="3"  height="9.4" rx="0.5" />
    <rect x="6.5" y="0.8" width="3"  height="9.4" rx="0.5" />
  </svg>
)

const SkipIcon = ({ reverse = false }) => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 11 11"
    fill="currentColor"
    aria-hidden="true"
    style={{ transform: reverse ? 'scaleX(-1)' : 'none' }}
  >
    <rect x="7.5" y="0.8" width="2" height="9.4" rx="0.5" />
    <path d="M6 0.8L0.5 5.5 6 10.2V0.8z" />
  </svg>
)

// ─── Component ────────────────────────────────────────────────────────────────
export default function AudioPlayer() {
  const [activeId,    setActiveId]    = useState(null)
  const [isPlaying,   setIsPlaying]   = useState(false)
  const [isLoading,   setIsLoading]   = useState(false)
  const [progress,    setProgress]    = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration,    setDuration]    = useState(0)

  // Refs for Tone.js objects and playback tracking
  const playerRef     = useRef(null)  // current Tone.Player instance
  const rafRef        = useRef(null)  // requestAnimationFrame id
  const playStartRef  = useRef(0)     // Tone.now() when this play segment began
  const offsetRef     = useRef(0)     // buffer position to resume from (seconds)
  const loadIdRef     = useRef(0)     // guards against stale async loads
  const isPlayingRef  = useRef(false) // mirror of isPlaying state for rAF closure

  // Keep isPlayingRef in sync with state
  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  // ── rAF tick ────────────────────────────────────────────────────────────────
  // Stored in a ref so the rAF loop always calls the freshest version of the
  // function without needing it as a dependency of handlePlayPause / handleSeek.
  const tickRef = useRef(null)
  tickRef.current = () => {
    if (!playerRef.current?.buffer) return
  
    const dur = playerRef.current.buffer.duration
    const elapsed = offsetRef.current + (Tone.now() - playStartRef.current)
    const clamped = Math.min(elapsed, dur)
  
    setCurrentTime(clamped)
    setProgress(dur > 0 ? clamped / dur : 0)
  
    if (clamped < dur) {
      rafRef.current = requestAnimationFrame(tickRef.current)
    } else {
      isPlayingRef.current = false
      setIsPlaying(false)
      setProgress(0)
      setCurrentTime(0)
      offsetRef.current = 0
    }
  }

  // ── Cleanup on unmount ──────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      cancelAnimationFrame(rafRef.current)
      if (playerRef.current) {
        try { playerRef.current.stop(); playerRef.current.dispose() } catch {}
      }
    }
  }, [])

  // ── Internal helpers ────────────────────────────────────────────────────────
  function stopPlayback() {
    cancelAnimationFrame(rafRef.current)
    if (playerRef.current) {
      try { playerRef.current.stop() } catch {}
    }
  }

  // ── Select & load a track ───────────────────────────────────────────────────
  async function selectTrack(track) {
    // Clicking the already-loaded active track does nothing
    if (track.id === activeId && playerRef.current?.loaded) return

    const id = ++loadIdRef.current
    stopPlayback()
    if (playerRef.current) {
      try { playerRef.current.dispose() } catch {}
      playerRef.current = null
    }

    setActiveId(track.id)
    setIsLoading(true)
    setIsPlaying(false)
    setProgress(0)
    setCurrentTime(0)
    setDuration(0)
    offsetRef.current = 0

    try {
      const player = new Tone.Player(track.src).toDestination()
      await Tone.loaded()

      // Discard if a newer load was triggered while this one was in flight
      if (id !== loadIdRef.current) {
        player.dispose()
        return
      }

      playerRef.current = player
      setDuration(player.buffer.duration)
    } catch (err) {
      console.error('[AudioPlayer] Failed to load track:', track.id, err)
    } finally {
      if (id === loadIdRef.current) setIsLoading(false)
    }
  }

  // ── Play / Pause ────────────────────────────────────────────────────────────
  async function handlePlayPause() {
    if (!playerRef.current?.loaded || isLoading) return

    // Browsers require a user gesture to resume the AudioContext
    try { await Tone.start() } catch {}

    if (isPlayingRef.current) {
      // Pause: store the current buffer position so we can resume from here
      const elapsed = offsetRef.current + (Tone.now() - playStartRef.current)
      offsetRef.current = Math.min(elapsed, playerRef.current.buffer.duration)
      stopPlayback()
      setIsPlaying(false)
    } else {
      // If we were at the very end, restart from the top
      if (offsetRef.current >= playerRef.current.buffer.duration - 0.01) {
        offsetRef.current = 0
      }
      playStartRef.current = Tone.now()
      try { playerRef.current.start(Tone.now(), offsetRef.current) } catch {}
      setIsPlaying(true)
      rafRef.current = requestAnimationFrame(tickRef.current)
    }
  }

  // ── Seek ────────────────────────────────────────────────────────────────────
  function handleSeek(e) {
    if (!playerRef.current?.loaded) return

    const rect     = e.currentTarget.getBoundingClientRect()
    const fraction = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    const seekTo   = fraction * playerRef.current.buffer.duration

    cancelAnimationFrame(rafRef.current)
    if (isPlayingRef.current) {
      try { playerRef.current.stop() } catch {}
    }

    offsetRef.current = seekTo
    setProgress(fraction)
    setCurrentTime(seekTo)

    // If we were playing, resume from the new position immediately
    if (isPlayingRef.current) {
      playStartRef.current = Tone.now()
      try { playerRef.current.start(Tone.now(), seekTo) } catch {}
      rafRef.current = requestAnimationFrame(tickRef.current)
    }
  }

  // ── Skip ────────────────────────────────────────────────────────────────────
  async function handleSkip(dir) {
    const idx  = TRACKS.findIndex(t => t.id === activeId)
    const next = TRACKS[(idx + (dir === 'next' ? 1 : -1) + TRACKS.length) % TRACKS.length]
    await selectTrack(next)
  }

  // ─────────────────────────────────────────────────────────────────────────────

  const activeTrack = TRACKS.find(t => t.id === activeId) ?? null
  const canPlay     = !!(activeTrack && !isLoading && playerRef.current?.loaded)

  return (
    <div className="ap">
      {/* ── Track list ──────────────────────────────────────────────────────── */}
      <div className='ap-header'>
        {/* Now-playing display */}
        <div className="ap-display">
          {activeTrack ? (
            <>
              <span className="ap-display-eyebrow">
                {isLoading ? 'loading…' : isPlaying ? 'now playing' : 'queued'}
              </span>
              <span className="ap-display-title">{activeTrack.title}</span>
              <div className="ap-display-tags">
                {activeTrack.tags.map(tag => (
                  <span key={tag} className="ap-tag ap-tag--lit">{tag}</span>
                ))}
              </div>
            </>
          ) : (
            <span className="ap-display-idle">select a track</span>
          )}
        </div>

        {/* Transport */}
        <div className="ap-transport">
          {/* Seek bar */}
          <div
            className="ap-seek"
            role="slider"
            aria-label="playback position"
            aria-valuenow={Math.round(progress * 100)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={canPlay ? 0 : -1}
            onClick={handleSeek}
          >
            <div className="ap-seek-rail">
              <div className="ap-seek-fill" style={{ width: `${progress * 100}%` }} />
            </div>
          </div>

          {/* Controls row */}
          <div className="ap-controls-row">
            <span className="ap-time">{fmt(currentTime)}</span>

            <div className="ap-btn-group">
              <button
                className="ap-btn"
                onClick={() => handleSkip('prev')}
                disabled={!activeTrack}
                aria-label="previous track"
              >
                <SkipIcon />
              </button>

              <button
                className="ap-btn ap-btn--main"
                onClick={handlePlayPause}
                disabled={!canPlay}
                aria-label={isPlaying ? 'pause' : 'play'}
              >
                {isLoading
                  ? <span className="ap-spinner" />
                  : isPlaying
                    ? <PauseIcon />
                    : <PlayIcon />}
              </button>

              <button
                className="ap-btn"
                onClick={() => handleSkip('next')}
                disabled={!activeTrack}
                aria-label="next track"
              >
                <SkipIcon  reverse/>
              </button>
            </div>

            <span className="ap-time ap-time--right">{fmt(duration)}</span>
          </div>
        </div>
      
      </div>
      <ul className="ap-list" role="list" aria-label="tracks">
        {TRACKS.map((track) => {
          const isActive      = track.id === activeId
          const isThisPlaying = isActive && isPlaying
          return (
            <li key={track.id}>
              <button
                className={[
                  'ap-item',
                  isActive      ? 'ap-item--active'  : '',
                  isThisPlaying ? 'ap-item--playing' : '',
                ].filter(Boolean).join(' ')}
                onClick={() => selectTrack(track)}
                aria-pressed={isActive}
              >
                {/* Dot → animated EQ bars when playing */}
                <span className="ap-item-indicator" aria-hidden="true">
                  {isThisPlaying ? (
                    <span className="ap-bars">
                      <span /><span /><span />
                    </span>
                  ) : (
                    <span className="ap-dot" />
                  )}
                </span>

                <div className="ap-item-body">
                  <span className="ap-item-title">{track.title}</span>
                  <div
                    className="ap-item-tags"
                    aria-label={`tags: ${track.tags.join(', ')}`}
                  >
                    {track.tags.map(tag => (
                      <span key={tag} className="ap-tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
