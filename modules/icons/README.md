# SSE Icons
A module for Nuxt 3 that allows you to use your own SVG icons quickly and enjoyably. 

## Installation 
1. `npm install @sse-ui/nuxt@latest`
2. add `@sse-ui/nuxt` to extends, **nuxt.config.ts**:
```javascript
export default defineNuxtConfig({
    extends: ['@sse-ui/nuxt']
})
```

## Usage
1. Create a `icons` folder in `assets`: `assets/icons`
2. Drop your icons with the **.svg** extension into the `icons` folder
3. In the project, use `<sse-icon name="">`, where name is the name of your svg icon from the folder

If you need to use the original color from the svg file (for example, if your icon has defs) you need to use the **filled** attribute: <br>
`<sse-icon name="mySuperIcon" filled />`

### Subfolders
If you would like to use some more complicated folder arrangement you will have to use paths from /icons

If you have a svg icon in nested directories such as:
```
📁icons
  └📁admin
  ⠀⠀└ badge.svg
  └📁user
  ⠀⠀└ badge.svg
```
then the icons's name will be based on its own path directory and filename. Therefore, the icon's name will be:
```html
<sse-icon name="admin/badge"> and <sse-icon name="user/badge">
```
## I don't like the basic styles that are assigned to the icons!
The styles that have been created for the icons look as follows: 
```css
width: 1em;
height: 1em;
margin-bottom: 0.125em;
vertical-align: middle;
```
You can easily change these styles using regular CSS for example in your index.vue file:
```vue
<style>
.nuxt-icon svg{
  margin-bottom: 0;
}
</style>
```
## I would like to use icons from an icon pack available online 
You can download icons in SVG format and put them in the `/icons` folder, or use another module that supports this natively:  [sse-icon](https://github.com/sseworld/sse-nuxt-ui/tree/master/modules/icons)

## What this module does
The module retrieves all svg files from the assets/icons folder, overwrites the height and width from them to make them scalable, and using the `<sse-icon>` component allows them to be used. `<sse-icon>` injects the SVG code directly into `<span>`. 

## Features
- Easy SVG icon management ✅
- HMR (You don't have to reset the project to reload the icons) ✅
- Ability to manipulate icons just like fonts, e.g. using `color`, `font-size` instead of `fill`,`width`,`height` ✅
- Ability to use the original color scheme for complex icons using the `filled` attribute ✅
- Icon only loads if used ✅

<br>

## Thoughts and ToDo's:
- Automatic svg file optimization 
- Automatic icon scaling that have non-square dimensions to maintain their proportions (maybe with preserveAspectRatio)
- If a lot of the same icons are used on the page create a separate svg sprite (significant improvement in performance)

A big thank you to [@sseworld](https://github.com/sseworld) and [@ssewofficial](https://github.com/ssewofficial) for his invaluable help in developing the project 