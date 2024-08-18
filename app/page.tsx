"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
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
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
          </div>
          <a className="text-white btn btn-ghost text-xl" href="#home">
            Flashcard SaaS
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a className="text-white">Resources</a>
            </li>
            <li>
              <a className="text-white" href="#features">
                Products
              </a>
            </li>
            <li>
              <a className="text-white" href="#price">
                Pricing
              </a>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <SignedOut>
            <Button className="butn1" color="inherit" href="/sign-in">
              Sign in
              <div className="arrow-wrapper">
                <div className="arrow"></div>
              </div>
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>

      <Container>
        {/* Hero Section */}
        <Box id="home" className="w-full h-screen text-center relative">
          <h1 className="mt-32 mx-32 text-[#0a2540]">
            Discover AI-Powered Effortless Learning.
          </h1>
          <p className="mx-56 mt-6 text-[#435466]">
            Unlock the power of AI with our cutting-edge Flashcard and PDF
            Scanner tool. Effortlessly transform your study materials and
            documents into interactive, customizable flashcards, and gain
            insights from PDFs like never before. Start learning smarter today!
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
        <Box id="features" className="w-full h-full text-center">
          <p className="text-indigo-600">Modular Solutions</p>
          <h2 className="text-[#0a2540] mx-36 mt-6">
            A fully integrated suite of educational products
          </h2>
          <hr className="w-full mt-12 border-indigo-600" />
          <div className="mt-24">
            <h2 className="text-[#0a2540]">PDF Scanner</h2>
            <p className="text-[#435466] mx-60 mt-6">
              A PDF scanner feature with AI capabilities enhances the
              traditional scanning process by integrating advanced machine
              learning and artificial intelligence technologies
            </p>
            <Image
              src="/images/pic1.png"
              alt="PDF Scanner Image"
              width={400}
              height={400}
              className="rounded-md items-center mx-auto mt-6 transform hover:scale-90 duration-500"
            />
          </div>
          <div className="mt-24">
            <h2 className="text-[#0a2540]">AI Generated Flashcards</h2>
            <p className="text-[#435466] mx-60 mt-6">
              Our AI-generated flashcards feature uses machine learning to
              automatically generate flashcards from your study materials. This
              feature is designed to help you study more efficiently and
              effectively.
            </p>
            <Image
              src="/images/pic2.png"
              alt="PDF Scanner Image"
              width={400}
              height={400}
              className="rounded-md items-center mx-auto mt-6 hover:scale-90 duration-500"
            />
          </div>
        </Box>

        {/* Pricing Section */}
        <Box id="price" className="w-full h-full text-center relative">
          <p className="text-indigo-600 mt-36">Pricing</p>
          <h2 className="text-[#0a2540] mt-5">What you pay</h2>
          <hr className="w-full border-indigo-600 mt-5" />
          <div className="flex items-center justify-center mt-16 pb-48">
            <div className="grid grid-cols-2 gap-4">
              <div className="card bg-white w-[30rem] h-64 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">Standard</h2>
                  <p className="text-left text-[#435466]">
                    Pay $3.99 for monthly subscription to get access to all
                    features
                  </p>
                  <div className="card-actions justify-start">
                    <Button className="butnSec" color="inherit" href="/sign-in">
                      Start now
                      <div className="arrow-wrapper">
                        <div className="arrow"></div>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="card bg-[#0b2e4e] w-[30rem] h-64 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title text-white">One-time</h2>
                  <p className="text-left text-[#adbdcc]">
                    Pay $13.99 today to get access to all of the features
                  </p>
                  <div className="card-actions justify-start">
                    <Button className="butnSec" color="inherit" href="/sign-in">
                      Try this!
                      <div className="arrow-wrapper">
                        <div className="arrow"></div>
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
