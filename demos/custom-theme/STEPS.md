Theming Steps

## Styles directory structure

- `/jsapi-styles/`
  - `/dist/`: The compiled theme and assets. Copy this for your app.
  - `/preview/`: The preview application used for building a theme.
  - `/sass/`: The code! Here is where the magic and work happens.
    - `/base/`: Here is where all the core defaults and styles are defined for colors, font, widgets, etc.
    - `/examples/`: Here are the `out-of-the-box` themes you can use to modify or create your own.
    - `/my-theme/`: This is the directory setup for you to start editing your theme

## Explore directory structure

View the following files:

- `/sass/my-theme/main.scss`
- `/sass/base/_color.scss`
- `/sass/base/_type_.scss`
- ...etc

## Lets start editing our theme

Open `/jsapi-styles/sass/my-theme/main.scss`.

## Lets update our theme code

Replace the code with the following

```scss
/*
  Theme: My Theme
*/

// Color
//$background-color: #4A31C2;
//$interactive-font-color: #C0E8FF;
//$button-color: #8070CC;
//$font-color: #FFFFFF;

// Keep this import last
@import "../base/core";
```

## Uncomment the color var lines to see changes.

## Change Font sizing

```scss
// Type
$line-height: 1.3em;
$base-font-size: 18px;
```

## Change Font

```scss
// Type
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700;900&display=swap");
$font-family: "Lato", sans-serif;
```

## Modify Button Sizes

```scss
// Size
$button-width: 42px;
$button-height: 42px;
```

## Open a widget base file and modify

Open `/jsapi-styles/sass/base/widgets/_Popup.scss`

Modify the file by removing everything and reload the preview page.

Notice how all the styling layout is gone but theme is still there.

## Complete

Lets go back to slides to review Theming.
