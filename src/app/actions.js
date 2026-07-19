"use server";

import { readFile, writeFile, mkdir } from "fs/promises";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");
const RSVP_FILE = join(DATA_DIR, "rsvps.json");

async function ensureDataDir() {
  try {
    await mkdir(DATA_DIR, { recursive: true });
  } catch {
    // Directory already exists
  }
}

async function readRSVPs() {
  try {
    const data = await readFile(RSVP_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function submitRSVP(formData) {
  try {
    const name = formData.get("name")?.toString().trim();
    const email = formData.get("email")?.toString().trim();
    const guests = parseInt(formData.get("guests")?.toString() || "1", 10);
    const dietary = formData.get("dietary")?.toString().trim() || "None";
    const message = formData.get("message")?.toString().trim() || "";

    // Validation
    if (!name || name.length < 2) {
      return { success: false, error: "Please provide your full name." };
    }
    if (!email || !email.includes("@")) {
      return { success: false, error: "Please provide a valid email address." };
    }
    if (guests < 1 || guests > 10) {
      return { success: false, error: "Number of guests must be between 1 and 10." };
    }

    await ensureDataDir();
    const rsvps = await readRSVPs();

    // Check for duplicate email
    const existing = rsvps.findIndex(
      (r) => r.email.toLowerCase() === email.toLowerCase()
    );

    const rsvpEntry = {
      name,
      email,
      guests,
      dietary,
      message,
      submittedAt: new Date().toISOString(),
    };

    if (existing >= 0) {
      rsvps[existing] = rsvpEntry;
    } else {
      rsvps.push(rsvpEntry);
    }

    await writeFile(RSVP_FILE, JSON.stringify(rsvps, null, 2), "utf-8");

    return {
      success: true,
      message: "You have been enlisted! Shinzou wo Sasageyo! 🗡️",
    };
  } catch (error) {
    console.error("RSVP submission error:", error);
    return {
      success: false,
      error: "Something went wrong. Please try again.",
    };
  }
}
