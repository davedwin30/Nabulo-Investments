/* ============================================================
   NABULO INVESTMENTS — Product Modal
   Handles tapping a product card to open a modal showing every
   variety/brand in that category, each with a placeholder photo
   tile. No new images or pages are loaded until a card is tapped.
   ============================================================ */

// One entry per data-key used in Nabulo.html. Each item in
// "items" becomes one placeholder tile in the modal.
// To swap in real photos later, see swapPlaceholderForImage()
// notes at the bottom of this file.
const productData = {
  washingPowder: {
    title: "Washing Powder",
    note: "Trusted laundry brands, sold per pack or wholesale carton.",
    emoji: "🧺",
    items: ["Sunlight", "Omo", "Ariel", "Toss", "Persil", "White Star"],
  },
  barSoap: {
    title: "Bar Washing Soap",
    note: "Everyday laundry bars, sold singly or by the carton.",
    emoji: "🧼",
    items: ["White Star", "Chapa Nyota", "Mukwano Bright", "Ntake"],
  },
  bathingSoap: {
    title: "Bathing Soap",
    note: "Daily care soaps for the whole family.",
    emoji: "🛁",
    items: ["Lifebuoy", "Geisha", "Dettol", "Imperial Leather"],
  },
  bulkRice: {
    title: "Bulk Rice",
    note: "Full sacks for traders, restaurants, and large households.",
    emoji: "🍚",
    items: [
      "Super Rice",
      "Kaiso Rice",
      "Basmati Rice",
      "Quality Rice",
      "Local Kuda Rice",
    ],
  },
  retailRice: {
    title: "Retail Rice",
    note: "Small packs sized for everyday household shopping.",
    emoji: "🍚",
    items: [
      "1kg bags",
      "2kg bags",
      "5kg bags",
      "White rice blends",
      "Broken rice",
    ],
  },
  wholesaleBeans: {
    title: "Wholesale Beans",
    note: "Full sacks of the most popular bean varieties.",
    emoji: "🫘",
    items: [
      "Sugar beans",
      "Red kidney beans",
      "Kabuli beans",
      "Desi beans",
      "Black beans",
    ],
  },
  retailBeans: {
    title: "Retail Beans",
    note: "Smaller packs, perfect for everyday cooking.",
    emoji: "🫘",
    items: ["Small bags of sugar beans", "Red beans for stews", "Mixed bean packs"],
  },
  bulkFlour: {
    title: "Bulk Flour",
    note: "Full sacks of posho and milled flour for shops and schools.",
    emoji: "🌾",
    items: [
      "White posho flour",
      "Yellow posho flour",
      "Premium mill flour",
      "Super posho blends",
    ],
  },
  retailFlour: {
    title: "Retail Flour",
    note: "Small packs for home baking and everyday porridge.",
    emoji: "🌾",
    items: ["1kg bags", "2kg bags", "Family friendly packs", "Extra-fine milling"],
  },
  sweetsSingle: {
    title: "Assorted Sweets — Single",
    note: "Sold by the piece, perfect for a quick treat.",
    emoji: "🍬",
    items: ["Fruit chews", "Hard candies", "Gums"],
  },
  sweetsPackets: {
    title: "Assorted Sweets — Packets",
    note: "Snack-sized packets for school and travel.",
    emoji: "🍭",
    items: ["Chocolate", "Mints", "Sour sweets"],
  },
  sweetsTins: {
    title: "Assorted Sweets — Party Tins",
    note: "Bulk tins for parties, schools, and events.",
    emoji: "🎉",
    items: ["Mixed party sweets", "School treat packs", "Event tins"],
  },
};

(function () {
  const overlay = document.getElementById("modalOverlay");
  const box = overlay.querySelector(".modal-box");
  const closeBtn = document.getElementById("modalClose");
  const titleEl = document.getElementById("modalTitle");
  const noteEl = document.getElementById("modalNote");
  const gridEl = document.getElementById("modalGrid");
  const eyebrowEl = document.getElementById("modalEyebrow");

  let lastFocusedCard = null;

  // Picks a tile background colour that matches the card's
  // category styling (yellow for cleaning, red for sweets,
  // green for everything else) so the modal feels consistent
  // with the card that opened it.
  function colorForCard(cardEl) {
    if (cardEl.classList.contains("clean")) return "var(--yellow-deep)";
    if (cardEl.classList.contains("sweet")) return "var(--red-tag)";
    return "var(--green)";
  }

  function openModal(key, cardEl) {
    const data = productData[key];
    if (!data) return;

    lastFocusedCard = cardEl;
    const tileColor = colorForCard(cardEl);

    eyebrowEl.textContent = "Varieties";
    titleEl.textContent = data.title;
    noteEl.textContent = data.note;

    gridEl.innerHTML = data.items
      .map(
        (name) => `
        <div class="variety-tile">
          <div class="variety-photo" style="--tile-color:${tileColor}">
            <span>${data.emoji}</span>
          </div>
          <div class="variety-name">${name}</div>
        </div>
      `
      )
      .join("");

    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocusedCard) lastFocusedCard.focus();
  }

  // Wire up every product card
  document.querySelectorAll(".tag[data-key]").forEach((card) => {
    card.addEventListener("click", () => openModal(card.dataset.key, card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(card.dataset.key, card);
      }
    });
  });

  // Close interactions: close button, click on the dark backdrop,
  // and the Escape key
  closeBtn.addEventListener("click", closeModal);
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("open")) {
      closeModal();
    }
  });
})();

/* ============================================================
   SWAPPING IN REAL PHOTOS LATER
   Right now each variety tile shows an emoji on a coloured
   background (see .variety-photo in Nabulo.css). Once you have
   real product photos:

   1. Add an "image" field to the relevant item, e.g.:
        items: [{ name: "Sunlight", image: "images/sunlight.jpg" }]
   2. In the openModal() template above, swap the <span>${data.emoji}</span>
      line for an <img> tag pointing at item.image, and fall back
      to the emoji if no image is set.

   This keeps the site working immediately with placeholders and
   lets you upgrade brand-by-brand whenever photos are ready,
   without breaking anything in the meantime.
   ============================================================ */