# 8NMotion — Family Hub

**Always moving. Always together.**

---

## First Time Setup (Do This Once)

### Step 1 — Create a GitHub Account
Go to **github.com** and sign up for a free account if you don't have one.

### Step 2 — Create a New Repository
1. Click the **+** icon in the top right corner
2. Click **New repository**
3. Name it: `8nmotion`
4. Set it to **Public**
5. Click **Create repository**

### Step 3 — Upload Your Files
1. On your new repository page click **Add file → Upload files**
2. Drag and drop the entire contents of this folder (all files and folders)
3. Scroll down and click **Commit changes**

### Step 4 — Connect to Netlify
1. Go to **netlify.com** and sign up using your GitHub account
2. Click **Add new site → Import from Git**
3. Choose **GitHub** and select your `8nmotion` repository
4. Netlify will auto-detect the settings (Build command: `npm run build`, Publish directory: `dist`)
5. Click **Deploy site**
6. In about 60 seconds your site is live at a URL like `random-name-123.netlify.app`

### Step 5 — Get Your Custom Domain (8nmotion.com)
1. In Netlify go to **Site settings → Domain management**
2. Click **Add a domain**
3. Type `8nmotion.com` and follow the steps to purchase and connect it
4. Cost is approximately $12 to $15 per year
5. Netlify handles everything including the SSL security certificate (the padlock in the browser)

---

## Updating the Site (Every Sunday)

### Option A — Use the Built-In Admin Panel (Easiest)
1. Go to your live site
2. Click **Update Site** in the top navigation
3. Enter password: **Infinite**
4. Type what you want to change in plain English
5. Click **Update Site** and it updates instantly

### Option B — Update the Source Files and Redeploy
1. Make changes to `src/data.js` for events, spotlights, or updates
2. Go to your GitHub repository
3. Click on the file you changed
4. Click the pencil icon to edit
5. Make your changes and click **Commit changes**
6. Netlify automatically rebuilds and publishes within 30 to 60 seconds

---

## How to Add Photos

### Step 1 — Prepare Your Photos
- Rename your photos clearly: `bailee-state-meet.jpg`, `family-cookout.jpg`, etc.
- Recommended size: square crops work best (1080x1080px)
- Keep file sizes under 500KB each for fast loading (use squoosh.app to compress for free)

### Step 2 — Add Photos to the Project
1. Go to your GitHub repository
2. Click on the `public` folder
3. Create a new folder called `photos` (click Add file → Create new file, type `photos/.gitkeep`, commit)
4. Upload your photo files into the `public/photos/` folder

### Step 3 — Update the Site
Use the Admin Panel and say something like:
*"Add a photo for Bailee from the state meet, the file is bailee-state-meet.jpg"*

Or use the Update Site panel with the direct image path: `/photos/bailee-state-meet.jpg`

---

## Family Member Quick Reference

| Name | Role | Wears #8 |
|------|------|----------|
| Rod | Dad · CNA · Pharod Thomas Photography | Yes |
| Kourtney | Mom · UPS Brands and Partnerships | No |
| Davian | The Prince · Air Force · Deployed Venezuela (back Oct) | Yes |
| Bailee | BeautMode · 11th Grade · Softball (Impact Gold ATL + HHS) · Track (HHS + Peak Performance South) · GHSA All American | Yes |
| Raelyn | Rae of Sunshine · 6th Grade · Basketball · Track · Flag Football · Artist · Crochets | Yes |
| Blaize | Litty · 1st Grade · Flag Football · Softball · Track · Self-Taught Gymnastics | Yes |
| Khari | Brother · Kindergarten · Flag Football + Baseball Coming Soon | Yes |
| Legend | Fur Sibling | No |

---

## Event Tag Types

| Tag | Color | Use For |
|-----|-------|---------|
| `sports` | Gold | Softball, basketball, flag football, track |
| `track` | Gold | Track meets specifically |
| `school` | Blue | School events, graduations, parent nights |
| `family` | Orange | Family gatherings, birthdays, anniversaries |
| `special` | Purple | Major milestones, championships, awards |

---

## Need Help?

Come back to Claude and say what you need updated. Claude has all the family context saved and can update the code, write new spotlights, or add events in minutes.
