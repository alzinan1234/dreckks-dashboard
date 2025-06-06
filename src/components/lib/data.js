// lib/data.js

export const supportTickets = Array.from({ length: 100 }, (_, i) => ({
  id: `TICKET-${1000 + i}`,
  submittedBy: "Haus & Herz",
  submittedById: `USER-${200 + (i % 5)}`, // Simulate different users
  avatar: "/image/userImage.png", // Path to a generic user avatar in public folder
  title: "Payment not processed",
  dateSubmitted: `May ${7 + (i % 23)}, 2025`, // Varying dates
  status: i % 3 === 0 ? "Resolved" : i % 3 === 1 ? "Pending" : "Open", // Varying statuses
  issueDescription: `I made a payment using my card for order #${
    5000 + i
  }, but the order is not showing in my purchase history. I've also received no confirmation email. Please look into it. ${
    i % 2 === 0 ? "The transaction ID was XYZ123." : ""
  }`,
}));

// Function to simulate fetching a single ticket by ID
export const getTicketById = (id) => {
  return supportTickets.find((ticket) => ticket.id === id);
};