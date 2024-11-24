/**
 * Displays an Easter egg message in the console for developers.
 * This function logs a series of styled console messages with a playful message
 * and a link to job opportunities.
 * @returns {void} - This function doesn't return anything.
 */
export function showConsoleEasterEgg(): void {
  console.log(
    "%cHey Kick Devs! 👋",
    "color: #53FC18; font-size: 16px; font-weight: bold;",
  );
  console.log(
    "%cLooks like you've cracked open the console... guess I caught your attention. 😉 \n\nSo here’s a thought:\nWhy make it this hard to find great talent? Let’s make it easier. Hire someone who can do it for you! 🚀\n\n 👉 marco@heftiweb.ch ",
    "color: #929EA6; font-size: 12px;",
  );
  console.log(
    "%cReady to elevate Kick to new heights? 🚀 Let's connect and make it happen:\n%chttps://easygo.io/pages/job-opportunities?s=&department=Engineering",
    "color: #929EA6; font-size: 12px;",
    "color: #53FC18; font-size: 12px; font-weight: bold;",
  );
  console.log(
    "%cP.S. This prototype is just the beginning. Excited to bring more to the table! 😉",
    "color: #929EA6; font-size: 10px;",
  );
}
