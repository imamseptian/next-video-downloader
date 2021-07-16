import Head from "next/head";
import Image from "next/image";
// import styles from '../styles/Home.module.css'
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  return (
    <div className="wrapper">
      {/* <h1>asu</h1> */}
      <Navbar />
      {/* <h1>ASU</h1> */}

      <div className="page-content">
        <h1>Welcome to MA SITE</h1>
        <h3>Select menu on the top to download video from provided website</h3>
      </div>
    </div>
  );
}
