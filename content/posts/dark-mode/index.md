---
title: "Light and dark mode? No thanks. I chose darkness."
date: 2026-09-09
draft: false
description: "In this post, I try to explain how my dark-mode functionality works, so you might wanna use it in your blog as well. And also, I write about why I only prefer darkmode as default now."
summary: "Having a Dark/light mode functionality is great. It's standard now. We take a look at how my theme switching system works. But is having a theme switching functionality a must? Is it essential? I thought it is. Maybe it is. But I don't care anymore. I adopted the darkness!"
categories:
  - programming
  - decision-log
tags:
  - theme
  - darkmode
  - blog
  - decision
series: []
featured_image: cover.png
showReadingTime: true
toc: true
---

# Light and dark mode? No thanks. I chose darkness.

## A battle between light and darkness

As my favorite character in TV said at his final scene: _"The oldest story... battle between good and evil... light and darkness."_ No, I won't give you context... and yes, it's dramatic. As my boy Rust Cohle in _True Detective_ season one.

When it comes to themes, light lost to darkness. Most programmers prefer darkness over light for their browser, code editor, or OS theme. Not just programmers, actually — most users prefer darkness. Darkness dominated light. We embrace darkness.

Quite an epic intro for a normal blog post.

## How my theme toggling worked (used to work!)

Before adding theme toggling, I had darkmode as my default — just like now. Then the idea of adding a button to let users choose dark or light mode came to mind. So I decided to implement it. It's not a sophisticated feature — it's simple, actually. And I'm not claiming my version is the best way to do it, since there are many ways to implement a feature. But here is how my simple theme toggling system worked:

Dark mode is implemented with a `data-theme` attribute on the `<html>` element.

### 1. Initial theme selection

In `head.html`, an inline script runs very early:

```html
<script>
  (function () {
    var t = localStorage.getItem("theme");
    var d = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
    document.documentElement.setAttribute("data-theme", t || d);
  })();
</script>
```

The order is:

1. Read the saved theme from `localStorage`.
2. If no saved theme exists, check the operating system/browser preference.
3. Set either:

```html
<html data-theme="dark"></html>
```

or:

```html
<html data-theme="light"></html>
```

Running this before loading the stylesheet helps prevent a flash of the wrong theme.

### 2. Theme switching

The bundled `theme-toggle.js` defines the theme behavior:

```javascript
const THEME_KEY = "theme";
const LIGHT = "light";
const DARK = "dark";
```

When the user clicks an element with `data-theme-toggle`:

- `dark` changes to `light`
- `light` changes to `dark`
- The selection is saved in `localStorage`
- The `data-theme` attribute is updated
- The button's icon, label, and `aria-pressed` state are updated

For example, a toggle button would need to look similar to:

```html
<button
  data-theme-toggle
  aria-label="Switch to dark mode">
  <span
    data-icon="sun"
    class="hidden"
    >☀</span
  >
  <span data-icon="moon">☾</span>
</button>
```

### 3. CSS applies the colors

The JavaScript itself does not define colors. The CSS in `assets/css/style.css` contains selectors such as:

```css
:root {
  /* Light theme variables */
}

[data-theme="dark"] {
  /* Dark theme variables */
}
```

Elements use the variables defined for the active theme. Changing `data-theme` automatically changes the matching CSS variables without reloading the page.

### Theme priority

The effective priority is:

1. User's saved `localStorage` choice
2. System/browser dark-mode preference
3. Light mode fallback

## Why I adopted the darkness (Batman is proud)

My blog had a darkmode/lightmode switch. You could toggle between themes with a button in the header. Just like most sites these days.

But I noticed my light mode theme isn't so good. I realized I haven't been as attentive and sensitive to it as I am to dark mode. So many ugly details — colors don't match, and overall, it yells "I have it, just to have it!" That's the whole thing.

I had light mode only to _have_ a light mode. To pass the standard of the web in 2026. I know standards are here for a reason. I know some people prefer light, or have difficulty reading in dark mode.

But here's the thing. My blog isn't perfect in any criteria, so why should I obsess over passing this one? Especially when I don't even feel good about it? Plus, I don't have many readers or web traffic, and I probably never will. It's a tiny, hidden blog that might not even be surprising if I'm the only audience. So I want it cozy. For me. I want it mine. Fully.

I don't want to fit in. I don't want to prefer an imaginary audience's taste over my own.

And it's not only about darkmode. I hope I can relate this to many things and aspects of my life. I hope I can learn to prioritize my own choices and feelings over the imaginary people I make up in my mind. If it's an API, you should tightly and strictly follow rules. If it's business logic code, you shouldn't prioritize your feelings or preferences at all. If it's a system you administer, you should always follow best practices to operate or keep it safe.

But do you really need to always wear a hoodie in autumn?


## P.S. Full code if you want to check it out

*(Note: these links point to a previous commit, before I removed the toggle.)*

- [theme-toggle.js](https://github.com/Yasin1ar/amirany.ir/blob/af6a6f88b6bc35aa20492cbd62b66275f0cce7a4/themes/catective/assets/js/theme-toggle.js) — the toggle logic
- [main.css](https://github.com/Yasin1ar/amirany.ir/blob/af6a6f88b6bc35aa20492cbd62b66275f0cce7a4/themes/catective/assets/css/main.css) — theme variables and colors
- [head.html](https://github.com/Yasin1ar/amirany.ir/blob/af6a6f88b6bc35aa20492cbd62b66275f0cce7a4/themes/catective/layouts/partials/head.html) — early theme detection