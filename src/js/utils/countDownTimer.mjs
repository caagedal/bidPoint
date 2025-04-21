/**
 * Creates a countdown timer to a specific end date and continuously updates it.
 *
 * @param {string|Date} endDate - The target date/time to count down to.
 * @param {(timeText: string, expired: boolean) => void} onUpdate - Callback triggered on each update.
 *        Receives a human-readable string and a boolean indicating if the countdown has ended.
 */
export function createCountdown(endDate, onUpdate) {
  let intervalId;

  /**
   * Calculates and sends the updated time remaining.
   */
  function update() {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;

    if (diff <= 0) {
      clearInterval(intervalId);
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

  intervalId = setInterval(update, 1000); // Update every second
  update(); // Trigger immediately on load
}
