<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-1.png" data-background-size="cover" -->
<!-- Presenter: Matt -->

# ArcGIS API for JavaScript: Customizing Widgets

### Matt Driscoll – [@driskull](https://twitter.com/driskull)

### JC Franco – [@arfncode](https://twitter.com/arfncode)

---

# Agenda

- What can be customized
- Customization approaches with demos

---

# Customizing Widgets

- Theming <!-- .element: class="fragment" data-fragment-index="1" -->
  - Changing styles: colors, sizing, font, etc.
- Altering presentation of a widget <!-- .element: class="fragment" data-fragment-index="2" -->
  - New view
  - Recreating a view
- Extending <!-- .element: class="fragment" data-fragment-index="3" -->
  - Overriding, adding functionality

---

# Customization Approaches

- Authoring a theme <!-- .element: class="fragment" data-fragment-index="1" -->
- Recreating a view <!-- .element: class="fragment" data-fragment-index="2" -->
- Extending a view <!-- .element: class="fragment" data-fragment-index="3" -->

---

<!-- Presenter: Franco -->

<h1>Part I</h1>

<h2>Theming</h2>

<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-3.png" data-background-size="cover"  -->

---

# Part I: Theming

## Why Theme? <!-- .element: class="fragment" data-fragment-index="0" -->

- Match branding.
- Contrast with the map.
- User-specific (e.g. bigger buttons).

<!-- .element: class="fragment" data-fragment-index="1" -->

---

# Esri Themes

10 themes are provided **out-of-the-box**:

Using a theme requires only a slight update to the CSS path.

```html
<link rel="stylesheet" href="https://js.arcgis.com/<version>/esri/themes/<theme-name>/main.css" />
```

---

<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-4.png" data-background-size="cover"  -->

**Theme Switcher**

[Out-of-the-box themes](../demos/out-of-the-box-themes/)

---

# Theming Technology

---

We use

![Sass](./img/sass-white.png)

### to create our CSS.

<img src="img/nodejs-new-pantone-black.png" height="80" style="margin-left:10px; margin-right: 10px;"/><!-- .element: class="fragment" data-fragment-index="1" -->
<img src="img/grunt.svg" height="80" style="margin-left:10px; margin-right: 10px;"/><!-- .element: class="fragment" data-fragment-index="1" -->

<small><a href="https://nodejs.org/">nodejs.org</a> | <a href="https://gruntjs.com/">gruntjs.com</a></small><!-- .element: class="fragment" data-fragment-index="1" -->

---

![Sass](./img/sass-white.png)

### is a powerful scripting language for compiling CSS.

- It's modular.
- It's DRY.
- It makes theming easy.

<!-- .element: class="fragment" data-fragment-index="1" -->

---

# Theming Steps

1.  Get our theme utility.
1.  Use the utility.
1.  Customize your theme.
1.  Host your CSS file.

<!-- .element: class="fragment" data-fragment-index="1" -->

---

# Step 1

Clone the repo.<br/>
<a href="https://github.com/jcfranco/jsapi-styles" target="_blank">https://github.com/jcfranco/jsapi-styles</a>

```
git clone https://github.com/jcfranco/jsapi-styles.git
```

---

# Step 2

`npm install`

- Installs the necessary bits.
- Creates a sample theme directory.
- Compiles the CSS from the SCSS.
- Spins up a preview in your default browser.

<!-- .element: class="fragment" data-fragment-index="1" -->

---

# Step 3

Edit your theme.<br/>
`sass/my-theme/main.scss`

<div>

<!-- intentional space after <div> above (for markdown rendering) -->

Optionally, edit your app.<br/>
`preview/index.html`

</div><!-- .element: class="fragment" data-fragment-index="1" -->

---

# Step 4

Host your stylesheet and any relevant assets.

Link your stylesheet in your app.

```html
<!-- In your app: -->
<link href="path/to/your/theme/main.css" rel="stylesheet" />
```

---

# Goals

Theme Smart

- Avoid adding additional CSS selectors
- Instead, use Sass to your advantage

---

# Theme Structure

Let's look at how the core theme is structured

- Color <span>: `_color.scss`</span><!-- .element: class="fragment" data-fragment-index="1" -->
- Size <span>: `_sizes.scss`</span><!-- .element: class="fragment" data-fragment-index="1" -->
- Type <span>: `_type.scss`</span><!-- .element: class="fragment" data-fragment-index="1" -->

---

# Theme Structure

### Default

```scss
// Inside base/_color_.scss
$background-color: #fff !default;
```

Any value assignment overrides the `!default` value.

```scss
// Inside sass/my-theme/main.scss
$background-color: #1e0707;
```

But wait...there's more!<!-- .element: class="fragment" data-fragment-index="1" -->

---

# Theme Structure

Override the core color variables...

```scss
$font-color: #3a5fe5;
$interactive-font-color: #ff1515;
$background-color: #1e0707;
$button-color: #8070cc;
```

...then magic!<!-- .element: class="fragment" data-fragment-index="1" -->

---

# Magic

Using `$button-color` we "automagically" set the hover color.

```scss
$button-color--hover: darken($button-color, 10%) !default;
// ...etc
```

[API Styling Guide](https://developers.arcgis.com/javascript/latest/guide/styling/index.html#sassy-widgets)

---

# Part I: Let's make a theme

<img src="./img/custom-theme.png" height=400 />

---

<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-4.png" data-background-size="cover" -->

**Custom Theme**

<!-- preview page requires utility to be running -->

[Preview](http://localhost:3001/preview/) | [Demo Steps](../demos/custom-theme/STEPS.md)

---

# Part I: Theming Recap

- Use the utility for easy theming.
- Theme structure
  - Color
  - Size
  - Typography
- Use the core and override values.

---

<!-- NEXT PART  A -->
<h1>End Part I</h1>

<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-3.png" data-background-size="cover"  -->

---

<!-- NEXT PART  B -->
<h1>Part II</h1>

<h2>Views</h2>

<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-3.png" data-background-size="cover"  -->

---

<!-- Presenter: Matt -->

# Part II: Widget Composition

Widgets are composed of Views & ViewModels

- Logic is separate from presentation
- Reusable
- UI replacement
- Framework integration

<!-- .element: class="fragment" data-fragment-index="1" -->

---

# Part II: TypeScript

- Widgets written in TypeScript (Typed JavaScript)
- JS of the future, now <!-- .element: class="fragment" data-fragment-index="1" -->
- IDE support <!-- .element: class="fragment" data-fragment-index="2" -->
  - Visual Studio
  - WebStorm
  - Sublime
  - and more!

---

# Part II: Views

- Presentation of the Widget
- Uses ViewModel APIs to render the UI
- View-specific logic resides here
- Extend `esri/widgets/Widget`

<!-- .element: class="fragment" data-fragment-index="1" -->

---

# Part II: Widget Class

`esri/widgets/Widget`

- Provides lifecycle
- API consistency

<!-- .element: class="fragment" data-fragment-index="1" -->

---

# Part II: Widget Lifecycle

- &shy;<!-- .element: class="fragment" data-fragment-index="1" --> `constructor`
- &shy;<!-- .element: class="fragment" data-fragment-index="2" --> `postInitialize`
- &shy;<!-- .element: class="fragment" data-fragment-index="3" --> `render`
- &shy;<!-- .element: class="fragment" data-fragment-index="4" --> `destroy`

---

# Part II: `render`

- Defines UI
- Reacts to state
- Uses JSX
- VDOM

<!-- .element: class="fragment" data-fragment-index="1" -->

---

# Part II: Working with Views

API Exploration

- [ScaleRangeSlider Doc](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-ScaleRangeSlider.html)
- [ScaleRangeSlider Demo](https://codepen.io/jcfranco-the-scripter/pen/GRJvXPZ?editors=1001)

---

# Part II: Recreating a view

Custom ScaleRangeSlider

[![Custom ScaleRangeSlider](./img/custom-scalerangeslider.png)](../demos/custom-scalerangeslider-complete/)

---

# Part II: CustomScaleRangeSlider Interface

```ts
interface CustomScaleRangeSlider {
  layer: Layer; // aliased
  rangeType: "to" | "from";
  region: string; // will use to get thumbnails
  view: MapView | SceneView; // aliased
  viewModel: ScaleRangeSliderViewModel; // handling logic!
}
```

---

<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-4.png" data-background-size="cover" -->

Recreating a view

[Demo Start](../demos/custom-scalerangeslider-start/) | [Demo Steps](../demos/custom-scalerangeslider-start/STEPS.md) | [ScaleRangeSlider Doc](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-ScaleRangeSlider.html)

---

# Part II: Views Recap

What have we learned about Widget Views?

- Face of the widget
- Present ViewModel logic
- ViewModel separation allows framework integration or custom views
- Downloadable on API docs

<!-- .element: class="fragment" data-fragment-index="1" -->

---

<!-- NEXT PART  A -->
<h1>End Part II</h1>

---

<!-- Presenter: Franco -->

<!-- NEXT PART  B -->
<h1>Part III</h1>

<h2>Extending a View</h2>

<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-3.png" data-background-size="cover"  -->

---

# Part III: Extending

- Why? <!-- .element: class="fragment" data-fragment-index="1" -->
  - Reusable <!-- .element: class="fragment" data-fragment-index="2" -->
  - Same ecosystem <!-- .element: class="fragment" data-fragment-index="3" -->
- How? <!-- .element: class="fragment" data-fragment-index="4" -->
  - &shy;<!-- .element: class="fragment" data-fragment-index="5" --> Leveraging `esri/widgets/Widget`
  - API widget views <!-- .element: class="fragment" data-fragment-index="6" -->

---

<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-4.png" data-background-size="cover"  -->

# Part III: Extending a View

**CustomScaleRangeSlider (revisited)**

[API Reference](https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-ScaleRangeSlider.html) |
[Demo](../demos/custom-scalerangeslider-extended-start/) |
[Steps](../demos/custom-scalerangeslider-extended-start/STEPS.md)

<img src="./img/custom-scalerangeslider-extended.png" height=400 />

---

# Part III: Extending a View Recap

- Reusable <!-- .element: class="fragment" data-fragment-index="1" -->
  - View/ViewModel <!-- .element: class="fragment" data-fragment-index="1" -->
- Same ecosystem <!-- .element: class="fragment" data-fragment-index="2" -->
  - No extra libraries <!-- .element: class="fragment" data-fragment-index="2" -->
- Extended existing widget <!-- .element: class="fragment" data-fragment-index="3" -->
  - Lifecycle <!-- .element: class="fragment" data-fragment-index="3" -->
  - TypeScript <!-- .element: class="fragment" data-fragment-index="3" -->

---

<!-- NEXT PART A -->
<h1>End Part III</h1>

<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-3.png" data-background-size="cover"  -->

---

# Conclusion

- Authored a theme <!-- .element: class="fragment" data-fragment-index="1" -->
- Recreated a view <!-- .element: class="fragment" data-fragment-index="2" -->
- Extended a view <!-- .element: class="fragment" data-fragment-index="3" -->

---

## Additional Resources

- [Implementing Accessor](https://developers.arcgis.com/javascript/latest/guide/implementing-accessor/index.html)
- [Setting up TypeScript](https://developers.arcgis.com/javascript/latest/guide/typescript-setup/index.html)
- [Widget Development](https://developers.arcgis.com/javascript/latest/guide/custom-widget/index.html)
- [Styling](https://developers.arcgis.com/javascript/latest/guide/styling/)
- [ArcGIS API for JavaScript - next](https://github.com/Esri/feedback-js-api-next)

---

## You might also be interested in...

- ArcGIS API for JavaScript: Getting Started with Web Development
- ArcGIS API for JavaScript: Using TypeScript
- ArcGIS API for JavaScript: Tips and Tricks for Developing and Debugging Apps
- Building Light-Weight Map Authoring Web Apps
- ArcGIS API for JavaScript: Building Your Own Widget

---

# Questions? 🤔 

> Where can I find the slides/source?

[bit.ly/buildwidgetsds20](http://bit.ly/buildwidgetsds20) 

> Where can I submit a question? 

[bit.ly/askjsapi](http://bit.ly/askjsapi)

---

![Esri](../node_modules/esri-reveal.js-templates/img/esri-science-logo-white.png)

<!-- .slide: data-background="../node_modules/esri-reveal.js-templates/img/2020/devsummit/bg-2.png" data-background-size="cover" -->
