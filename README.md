# Frontend Assignment: Whatbytes E-commerce Store

This project implements a basic e-commerce store with a product listing page and a product detail page, focusing on responsive design.

## Table of Contents

-   [Features](#features)
-   [Pages & Layout](#pages--layout)
    -   [1. Home Page (/) - Product Listing](#1-home-page---product-listing)
    -   [2. Product Detail Page (/product/[id])](#2-product-detail-page-productid)
-   [Technology Stack](#technology-stack)
-   [Setup & Installation](#setup--installation)
-   [Running the Application](#running-the-application)
-   [Project Structure](#project-structure)
-   [Styling & Responsiveness](#styling--responsiveness)
-   [Future Enhancements](#future-enhancements)
-   [License](#license)

## Features

-   **Product Browsing**: Users can view a list of available products.
-   **Product Filtering**: Filter products by category and price.
-   **Product Details**: View detailed information for individual products.
-   **Add to Cart**: Functionality to add products to a cart (basic implementation).
-   **Responsive Design**: Optimized for seamless viewing across various devices (mobile, tablet, desktop).

## Pages & Layout

### 1. Home Page (/) - Product Listing

The main landing page displaying all products with filtering options.

**Layout Breakdown:**

*   **Header:**
    *   **Left:** Logo.
    *   **Center:** Search bar for product lookup.
    *   **Right:** Cart icon (with a potential badge for item count) and placeholder for a user profile/avatar.
*   **Main Section:**
    *   **Sidebar (Left):**
        *   Category filter (implemented using radio buttons/pills).
        *   Price range slider.
*   **Footer:**
    *   Copyright information.
    *   Social media icons (Facebook, Twitter, Instagram).

### 2. Product Detail Page (/product/[id])

Dedicated page for a single product with comprehensive information.

**Layout Breakdown:**

*   **Image Section (Left):**
    *   Displays the product's main image or an image carousel (if multiple images are available).
*   **Details Section (Right):**
    *   Product Title.
    *   Product Price.
    *   Detailed Product Description.
    *   Product Category.
    *   Quantity Selector.
    *   "Add to Cart" button.

## Technology Stack

*   **Framework:** Next.js (React)
*   **Styling:** Tailwind CSS
*   **Icons:** Lucide React

## Setup & Installation

*  **Clone The Project**
```git
git clone https://github.com/akashbhardwaj23/whatbytes-assignment
```

*  **Install Dependencies**
```js
npm install
```

*  **Start The Project**
```
npm run dev
```


## Visit the website here - [WhatBytes](https://whatbytes-assignment-one-gamma.vercel.app/)