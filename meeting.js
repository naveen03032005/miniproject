const localVideo = document.getElementById('local-video')
const notesList = document.getElementById('notes-list')
const muteBtn = document.getElementById('mute-btn')
const videoBtn = document.getElementById('video-btn')

// Set room ID from URL
const params = new URLSearchParams(window.location.search)
document.getElementById('room-id').textContent = params.get('id') || "Unknown"

let localStream

// Simulate incoming AI notes
setInterval(() => {
  const note = "AI Note at " + new Date().toLocaleTimeString()
  const li = document.createElement('li')
  li.textContent = note
  notesList.appendChild(li)
  notesList.scrollTop = notesList.scrollHeight
}, 5000)

// Tabs switch
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'))
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'))
    tab.classList.add('active')
    document.getElementById(tab.dataset.tab).classList.add('active')
  })
})

// Local camera preview
async function startCamera() {
  try {
    localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    localVideo.srcObject = localStream
  } catch (err) {
    alert('Error accessing camera/microphone: ' + err.message)
  }
}
startCamera()

// Mute/unmute
muteBtn.addEventListener('click', () => {
  if (!localStream) return
  const audioTrack = localStream.getAudioTracks()[0]
  audioTrack.enabled = !audioTrack.enabled
  muteBtn.textContent = audioTrack.enabled ? '🎤 Mute' : '🔇 Unmute'
})

// Video on/off
videoBtn.addEventListener('click', () => {
  if (!localStream) return
  const videoTrack = localStream.getVideoTracks()[0]
  videoTrack.enabled = !videoTrack.enabled
  videoBtn.textContent = videoTrack.enabled ? '📷 Video Off' : '📷 Video On'
})

// Leave meeting
document.getElementById('leave-btn').addEventListener('click', () => {
  window.location.href = "index.html"
})
