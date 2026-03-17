Name : Priyansh Patel 
Enrollment: 202307020089
# ShopVibe - E-Commerce Frontend

ShopVibe is a modern, visually appealing React-based e-commerce frontend application. Built to strict academic specifications, it delivers a premium UI experience with responsive layouts, smooth animations, and a cohesive design system.

## 🌟 Key Features

*   **Product Listing:** A clean, responsive grid layout for browsing products fetched dynamically from an API.
*   **Product Details:** An in-depth view for individual products, complete with high-quality images, descriptions, ratings, and a clear "Add to Cart" action.
*   **Shopping Cart:** A fully functional cart system. Users can add items, view quantities, see individual item subtotals, and remove items. Includes a polished empty state.
*   **Checkout Process:** A structured order summary including order items, subtotal, tax calculation, and a simulated "Place Order" success flow.
*   **Global State Management:** Seamless state handling across components using React Context API.
*   **Dynamic Routing:** Smooth navigation between pages built with React Router.
*   **Premium UI/UX:**
    *   Custom warm brown/cream color palette (`#FFF8F0`, `#C08552`, `#8C5A3C`, `#4B2E2B`).
    *   Glassmorphic navbar with an interactive cart badge.
    *   Card-based layouts with smooth hover animations and shadow transitions.
    *   Modern typography using the 'Poppins' font family.

## 🛠️ Technology Stack

*   **Frontend Library:** React (Functional Components & Hooks)
*   **Routing:** React Router v6
*   **State Management:** React Context API
*   **API Client:** Axios
*   **Styling:** Vanilla CSS (Custom Design System)
*   **Data Source:** FakeStore API

## 📂 Project Structure

```text
src/
├── components/
│   ├── ProductList.js    # Renders the product grid with cards
│   ├── ProductDetail.js  # Renders the individual product view
│   ├── Cart.js           # Manages cart items and order summary sidebar
│   └── Checkout.js       # Displays final payment summary and places order
├── context/
│   └── CartContext.js    # Global state management for cart operations
├── services/
│   └── api.js            # Axios service for FakeStore API communication
├── App.js                # Main application component with routing and navbar
├── App.css               # Global styles and central design system
└── index.js              # Application entry point wrapped with CartProvider
```

## 🚀 Getting Started

To run this project locally, follow these steps:

### Prerequisites

Ensure you have Node.js and npm installed on your machine.

### Installation

1.  **Clone the repository (if applicable) or navigate to the project directory:**
    ```bash
    cd fsd_practical-7
    ```

2.  **Install the dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm start
    ```

4.  **Open in Browser:**
    The application will automatically open in your default browser at `http://localhost:3000`. If it doesn't, navigate to that URL manually.

## 💡 Usage Highlights

*   **Responsive Design:** The layout automatically adjusts for desktop, tablet, and mobile devices, ensuring a consistent experience.
*   **Visual Feedback:** Interactive elements like buttons and product cards provide immediate visual cues (scale effects, color changes) upon user interaction.
*   **Loading States:** Dedicated loading spinners are implemented while data is being fetched from the API to handle asynchronous wait times gracefully.

---
*Built with ❤️ using React*
