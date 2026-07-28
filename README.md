🏛️ Auction House — Client

The frontend for a vintage auction platform — browse, bid in real time, and manage your own listings. Talks to a separate Express API, no server-side rendering here.

📦 Stack

React 19 (Vite)
TypeScript
Tailwind CSS v4
React Router
Socket.io-client
Axios

✨ Quick start

bash
npm install
npm run dev

You'll need a .env with VITE_API_URL pointing at the backend (local or deployed).

🗂️ What it does

Browse & filter — category, price range, and sort, all synced with the URL so results are shareable
Auction detail — live countdown, bid history, and real-time price updates the moment someone else bids
Bidding — modal-based bid flow, guarded behind login
Create & manage listings — full form for new auctions (with image upload), edit/delete for your own — locked once bidding starts
Profile — see your own auctions and every bid you've placed, with a quick "winning or outbid" indicator
Auth — persistent login via Context + localStorage, protected routes for anything that needs you signed in

🎨 Look & feel

Dark, minimal hero up top; clean, light-toned pages for everything else. Geist for text, Geist Mono for prices, timers, and anything numeric.

🤖 How it works

An AuthContext holds the token and user, restores itself from localStorage on load, and keeps Axios's default headers in sync so every request is authenticated automatically — no per-request wiring needed. The auction detail page opens a Socket.io connection, joins a room scoped to that specific auction, and listens for new-bid events to update the price and bid list live, without a refresh. Filters, search, and sort all live in component state (with the homepage search bar deep-linking into the auctions page via a URL query param), and a single effect re-fetches whenever any of them change.

📁 Project structure

src/
  pages/                  # Route-level components (Home, Auctions, AuctionDetail, Profile, auth forms)
  components/              # Reusable UI (Card, Navbar, BidModal, DeleteConfirmModal, Countdown, BidListItem)
  context/                  # AuthContext
  lib/                       # Axios instance
  socket/                    # Socket.io client setup
  router/                     # Route definitions

👤 Author

Milos Lazendic — github.com/itsmilos
