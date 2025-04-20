export function createCountdown(endDate, onUpdate) {
  let intervalId;

  function update() {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;

    if (diff <= 0) {
      clearInterval(intervalId); // 🔁 Nå funker det!
      onUpdate("Auction ended", true);
      return;
    }

    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600 * 24));
    const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const timeText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    onUpdate(timeText, false);
  }

  intervalId = setInterval(update, 1000); // 🔁 Definer først
  update(); // ✅ Kall etterpå
}
