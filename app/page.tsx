"use client";
import React, { useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Grid,
  Container,
} from "@mui/material";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import getStripe from "../utils/get-stripe"; // Adjust according to your project structure
import "./globals.css";

const HomePage: React.FC = () => {
  // Stripe checkout function
  const handleSubmit = async () => {
    try {
      const checkoutSession = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          origin: "http://localhost:3000",
        },
      });

      const checkoutSessionJson = await checkoutSession.json();

      const stripe = await getStripe();

      if (!stripe) {
        console.error("Stripe.js has not loaded.");
        return;
      }
      const { error } = await stripe.redirectToCheckout({
        sessionId: checkoutSessionJson.id,
      });

      if (error) {
        console.warn(error.message);
      }
    } catch (error) {
      console.error("Error during Stripe checkout:", error);
    }
  };

  return (
    <>
      {/* Header and Navigation */}
      {/* <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Flashcard SaaS
          </Typography>
          <SignedOut>
            <Button color="inherit" href="/sign-in">
              Login
            </Button>
            <Button color="inherit" href="/sign-up">
              Sign Up
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </Toolbar>
      </AppBar> */}

<div className="navbar bg-gradient-to-r from-indigo-600 via-purple-500 to-orange-400">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h8m-8 6h16" />
        </svg>
      </div>
      
    </div>
    <a className="text-white btn btn-ghost text-xl">Flashcard SaaS</a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1">
      <li><a className="text-white">Resources</a></li>
      <li>
        <details>
          <summary className="text-white">Products</summary>
          <ul className="p-2">
            <li><a className="text-white">Flashcards</a></li>
            <li><a className="text-white">Research</a></li>
          </ul>
        </details>
      </li>
      <li><a className="text-white">Pricing</a></li>
    </ul>
  </div>
  
  <div className="navbar-end">
  <SignedOut>
            <Button className='butn1' color="inherit" href="/sign-in">
              Sign in
              <div className="arrow-wrapper">
        <div className="arrow"></div>

    </div>
            </Button>
          </SignedOut>
  </div>
</div>




      <Container>
        {/* Hero Section */}
        <Box className="w-full h-screen text-center relative">
          <h1 className="mt-32 mx-32 ">Discover AI-Powered Effortless Learning.</h1>
          <p className="mx-56 mt-6 text-[#5d6d7c]">
  Unlock the power of AI with our cutting-edge Flashcard and PDF Scanner tool. Effortlessly transform your study materials and documents into interactive, customizable flashcards, and gain insights from PDFs like never before. Start learning smarter today!
</p>

          <Button
            variant="contained"
            color="secondary"
            sx={{ mt: 2, mr: 2 }}
            href="/generate"
          >
            Get Started
          </Button>
          <Button variant="outlined" color="secondary" sx={{ mt: 2 }}>
            Learn More
          </Button>
        </Box>

        {/* Features Section */}
        <Box sx={{ my: 6 }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Features
          </Typography>
          <Grid container spacing={4}>
            {/* Add feature items here */}
          </Grid>
        </Box>

        {/* Pricing Section */}
        <Box sx={{ my: 6, textAlign: "center" }}>
          <Typography variant="h4" component="h2" gutterBottom>
            Pricing
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {/* Add pricing plans here */}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
