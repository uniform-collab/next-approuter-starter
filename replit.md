#Uniform Core Concepts

Uniform is a modern, headless, component-based Content Management System (CMS). Its primary purpose is to allow non-technical authors (marketers, etc) to create and maintain websites and other similar experiences in a visual editor.

Uniform Compositions

A composition instance in Uniform is roughly equivalent to a page. Composition definitions define a reusable schema for composition instances. 
Composition definitions have a structure identical to a Uniform Component, i.e. parameters and slots. 
Composition instances differ from components in that they also define a route or page. 
Instances of a composition create pages or routes within an application. 
The term "Composition" can be used to refer either to a definition or instance of a composition, you will need to infer which is meant (schema/reusable template = definition, page/route = instance).

Composition parameters should only be used for global content that will never need to be personalized.
Good example: OpenGraph data and meta tags (if they exist)
Bad example: "hero title" belongs in a Hero component in the content slot.

A single composition definition called 'Page' is generally a good starting point. Additional composition definitions are only required if the page shell is different (e.g. Page, Popup, Minimal Page), or if there are different parameters needed on the composition definition

In developer terms, a composition instance is a dynamic layout that is defined by non-technical authors; a composition definition is a hierarchical content schema definition.

Uniform Components

Uniform Components are used to allow CMS authors to create and manipulate visual elements on a composition. Each property of a Uniform Component, such as a title or image, is called a _Component Parameter_. See _Uniform Parameter/Field Types_ for the exact types of parameter that are allowed. Components have both a definition (their schema) and instances (when an instance of that schema is placed within a slot on a composition).

Uniform Components can define named _slots_.

- A slot allows additional components (or component patterns) to be inserted within the Uniform Component. For example an accordion component could have an 'items' slot that allows adding Accordion Item components.
- Each named slot has 0..n child components. The order in the slot determines the order of rendering.
- Each slot definition allows only specific Uniform Components to be placed within it (by public id). It can also define the minimum and maximum number of components allowed.
- Components allowed within slots can also have their own slots, with no depth limit - but it is generally undesirable to nest more than 2-3 levels deep to improve author understanding.
- When a Uniform Composition is defined, it almost always has a generic 'content' slot added to it that allows using various components to define the layout.

Uniform Component Definition attributes:

- _name_
- _public ID_
- _parameters_
- _slots_

Uniform Slot Definition attributes:

- _name_
- _public ID_
- _allowed components_
- _min components_
- _max components_

In technical terms, a Uniform Component maps directly to a presentational frontend component such as a React component. The parameters are component props. Slots are component props that contain rendered child components.

# Uniform Composition Management

Uniform Fields or Uniform Parameters attributes:

- _name_
- _public ID_. Must be unique within a Uniform Component or Uniform Content Type (including the ID of group fields/parameters)
- _localizable_. Localizable values have a distinct value for each locale; otherwise the value is the same for all locales.
- _required_. Required means that a CMS author must input a value in order to be considered valid.
- _type_. See list below.
- _guidance_. Brief LLM instructions used when generating or editing values.
- _overridable_. Only applies for fields/parameters on a pattern definition. Allows consumers of the pattern to break inheritance and change the pattern definition's value for the field/parameter.

Exhaustive list of allowed field/parameter types:

- _text_: Plain text content
- _richText_: Formatted text with styling (Lexical JSON format)
- _select_: Choose between a controlled vocabulary of options
- _multi-select_: Choose between a controlled vocabulary of options, allowing multiple selections
- _number_: Numeric value
- _date_: Calendar date
- _dateTime_: Date with timezone
- _checkbox_: Boolean toggle
- _link_: URL or internal reference
- _asset_: Image, video, audio, or other file
- _json_: A JSON object. Not for use in author-facing fields/parameters, who will have trouble editing JSON.
- _contentReference_: Allows referencing one or more Entries of a specific type. Can be used in Content Types, but not in Uniform Components.
- _$enr_: Tag content with enrichments (relevant segments) to make viewing the content alter the classification of the visitor that saw it.
- _group_: Group multiple fields/parameters together visually, for example a group of address fields. IMPORTANT: fields added to a group must come directly after the group in the fields list.


### Uniform Naming Conventions

- All names should be title-cased prose, not technical shorthand (e.g. "Main Header" not "main-header" or "MainHeader"). There is no need to include the type of entity in a name (e.g. 'Hero' not 'Hero Component').
- Do not name Uniform Components, Uniform Content Types, or Fields/Parameters based on visible content found in inputs; treat it as FPO (e.g. <h1>Hello</h1> does not mean name the component 'Hello' - describe its meaning instead, such as 'Headline').
- _Public ID_ are developer-facing identifiers for Uniform entities. They are based on a slugified version of the name. Use a camel case, for example if the name is "Main Header", the public ID is "mainHeader". Public IDs must be unique within a given entity type (e.g. Uniform Components). You cannot alter public IDs after creating an entity. IMPORTANT: public IDs on parameters, fields, or components that start with `$` are system-owned, and cannot be altered by users. For example, you may not change parameters of the `$personalization` component or remove the `$viz` parameter from any component. You may add or remove system components such as `$test` to a slot's `allowedComponents`.
- Help text should be no longer than 1 short sentence. It is not necessary to write help text unless we have specific expectations for authors. For example a 'Title' doesn't need help text. But if we identify an image that needs to be 250x250px, that expectation belongs in help text. Descriptions and help text are plain text, no markdown or HTML.

- # Uniform Assets Best Practices

- #### Best Practices for Assets

1. **Always provide fallback placeholders** when no image is selected
2. **Extract alt text** from asset metadata for accessibility
3. **Use appropriate dimensions** for the use case:
   - Hero images: 1920x1080 or larger
   - Card images: 400x300
   - Thumbnails: 200x200
   - Full-width: 1200x600
4. **Use focal points** for critical images where composition matters
5. **Set proper quality** (85 is a good default, 90+ for photography)
6. **Use responsive sizes** attribute for Next.js Image optimization
7. **Consider fit mode**:
   - Use `"cover"` for backgrounds and cards
   - Use `"contain"` when full image must be visible
   - Use `"scale-down"` for flexible width-only scaling
8. **Log transformations** during development to verify URLs are correct

### Asset Parameters and Focal Points

This project includes sophisticated asset handling with multi-CDN support and focal point positioning. Assets are always received as arrays from Uniform.

#### Asset Type Definition

```typescript
import type { AssetParamValue } from "@uniformdev/assets";

export interface ComponentProps {
  image?: AssetParamValue; // Array of asset objects
  backgroundImage?: AssetParamValue;
  // ... other props
}
```

#### Basic Asset Processing Pattern

```typescript
// 1. Extract the asset from the array
const imageAssets = image ?? [];
const [firstAsset] = imageAssets;

// 2. Get transformed URL with options
const imageUrl = getTransformedImageUrl(firstAsset, {
  width: 800,
  height: 600,
  fit: "cover",
  focal: focalPoint || "center",
  quality: 85,
});

// 3. Extract alt text for accessibility
const imageAlt = firstAsset?.fields?.description?.value || 
                firstAsset?.fields?.title?.value || 
                'Image';
```

#### Focal Point Handling

Focal points allow precise control over which part of an image is displayed when cropped.

**Extracting focal point from asset:**
```typescript
const focalPoint = firstAsset?.fields?.focalPoint?.value;
// Returns: { x: 0.5, y: 0.5 } or undefined
// Coordinates are 0-1 where (0,0) is top-left, (1,1) is bottom-right
```

**Using focal points in transformations:**
```typescript
// Option 1: Use in getTransformedImageUrl (recommended)
const imageUrl = getTransformedImageUrl(firstAsset, {
  width: 1200,
  height: 600,
  fit: "cover",
  focal: focalPoint || "center", // Uses focal point or centers
  quality: 85,
});

// Option 2: Use with imageFrom directly
const imageUrl = firstAsset
  ? imageFrom(firstAsset)
      .transform({ 
        width: 1200,
        height: 600,
        fit: "cover",
        focal: focalPoint || "center"
      })
      .url()
  : undefined;
```

**Using focal points for CSS backgrounds:**
```typescript
const backgroundPosition = focalPoint
  ? `${focalPoint.x * 100}% ${focalPoint.y * 100}%`
  : 'center';

<div style={{
  backgroundImage: `url('${imageUrl}')`,
  backgroundPosition,
  backgroundSize: 'cover',
}} />
```

#### Image Transformation Options

The `getTransformedImageUrl` utility supports multiple CDNs with consistent API:

**Available options:**
```typescript
interface TransformOptions {
  width: number;              // Required: target width in pixels
  height?: number;            // Optional: target height in pixels
  fit?: "cover" | "contain" | "scale-down"; // Resize mode
  focal?: { x: number; y: number } | "center" | "auto"; // Focal point
  quality?: number;           // 1-100, default varies by CDN
  dpr?: number;              // Device pixel ratio (1, 2, etc.)
}
```

**Fit modes:**
- `"cover"` - Crop to fill dimensions (maintains aspect ratio)
- `"contain"` - Fit inside dimensions (maintains aspect ratio, may letterbox)
- `"scale-down"` - Scale down to fit width (maintains aspect ratio)

**Focal point options:**
- `{ x: 0.5, y: 0.5 }` - Custom coordinates (0-1 range)
- `"center"` - Center the image
- `"auto"` - Auto-detect focal point (faces, entropy)

# Uniform Next.js App Router SDK

### Rendering Uniform Components using React Components

> IMPORTANT: before generating Uniform component code, always fetch available component definitions from Uniform to be aware of the schema.

The `UniformComposition` component needs to know how to map a Uniform Component instance's `type` to a React component that implements the UI for that component. This is done using the Component Registry. To use the component registry, create a component and register it:

`components/Hero.tsx`:

```tsx
import { registerUniformComponent } from "@uniformdev/canvas-react";

function Hero() {
  return <div>Hero Component Content</div>;
}

registerUniformComponent({
  type: "hero",
  component: Hero,
});
```
Conventionally Uniform components (like Hero.tsx above) are imported to a barrel file in `components/uniformComponents.ts` (e.g. `import 'componentFileName';`), and that barrel file is imported into `_app.tsx` (e.g. `import '../components/uniformComponents';`) to ensure the registrations are processed.


#### Mapping Uniform Components to React Components

React components that receive Uniform Component data are passed props that correspond to the shape of the component definition they render. The `ComponentProps` type can be used to make the mapping explicit:

```tsx
import {
  AssetParamValue,
  LinkParamValue,
  RichTextParamValue,
} from "@uniformdev/canvas";

type HeroProps = ComponentProps<{
  textParameter?: string;
  richTextParameter?: RichTextParamValue;
  linkParameter?: LinkParamValue;
  assetParameter?: AssetParamValue;
  // it is critical that all parameter props values are optional, because they can be undefined - even if 'required' on the component definition
}>;

function Hero(props: HeroProps) {
  return <div>{props.textParameter}</div>;
}
```

#### Rendering child slots

If a Uniform Component definition has slots defined, the components in those slots can be rendered using the `UniformSlot` component.

```tsx
import { UniformSlot } from "@uniformdev/canvas-react";

function Hero() {
  return (
    <div>
      <div>
        <UniformSlot name="start" />
      </div>
      <div>
        <UniformSlot name="end" />
      </div>
    </div>
  );
}
```

#### Rendering parameter/field values

##### Text parameters/fields

When rendering a `text` type parameter, always use the `UniformText` component to render the value. This will enable authors to edit the value within the Uniform preview directly. Text parameters that do not have a visible component, such as alt text, should be rendered as their raw text value:

```tsx
import { UniformText } from "@uniformdev/canvas-react";

function Hero() {
  return (
    <div>
      {/* always specify placeholder text that an author will see in the visual editor when the value is empty */}
      <UniformText parameterId="textParameter" placeholder="Enter text" />
      {/* optionally you can specify a className or wrapping tag, as well as placeholder text that an author will see in the visual editor when the value is empty */}
      <UniformText parameterId="textParameter" as="h1" className="excellent" placeholder="Enter text" />
    </div>
  );
}
```

##### Rich text parameters/fields

For richText parameters, always use the `UniformRichText` component to automatically render the rich text (stored as Lexical JSON) to HTML:

```tsx
import { UniformRichText } from "@uniformdev/canvas-react";

function Hero() {
  return (
    <div>
      <UniformRichText parameterId="richTextParameter" placeholder="Prompt for author when value is empty" />
    </div>
  );
}
```

##### Asset parameters/fields

When rendering asset parameters, use the `flattenValues` helper to simplify value access:

```tsx
import { AssetParamValue, flattenValues } from "@uniformdev/canvas";

interface MyComponentProps {
  multipleImagesAssetParam: AssetParamValue;
  singleImageAssetParam: AssetParamValue;
}

function MyComponent({
  multipleImagesAssetParam,
  singleImageAssetParam,
}: MyComponentProps) {
  // when multiple assets are allowed, flatten to an array
  const images = flattenValues(multipleImagesAssetParam);
  // when only one asset is allowed, flatten to a single object
  const image = flattenValues(singleImageAssetParam, { toSingle: true });

  return (
    <>
      {images?.map((img, index) => (
        <img key={index} src={img?.url} width={img?.width} height={img?.height} />
      ))}
      <img src={image?.url} width={image?.width} height={image?.height} />
    </>
  );
}
```

#Uniform CMS

### Uniform Entries

Entries are instances of structured content that you create using predefined Uniform Content Types. Think of content types as blueprints and entries as the actual content built from those blueprints.

Each entry contains structured data for content pieces like articles, events, products, or any other content you need. Once created, entries become reusable assets that can power multiple experiences across your digital channels.

#### How entries differ from compositions and components

An entry is structured content that represents a piece of content in a design-agnostic way. A component or composition describes the experience layer by defining which concrete UI component should be used to show particular content. Entries can also define relationships to other entries via references, which allows building complex content structures.

By connecting the fields of an entry to the parameters of a component, you define how the content is displayed in a certain context. For example, you could show the same article entry in a hero, a card, or a list component. Which fields of an entry are shown can be different for each use case.

### Uniform Content Types

Uniform Content Types define a reusable structure for individual reusable pieces of content. A Uniform content type differs from a Uniform component because a component represents a specific visual element on a composition/page, but a content type is an abstract, reusable content schema. An instance of a Uniform Content Type is called an _Entry_. Entries each have their own built-in slug: there is no need to define an explicit slug field.

For example a Product might be a Uniform Content Type, and the data from instances of that Product could be presented in different contexts by Uniform Patterns such as Product List, Product Detail, or Product Card.

Uniform Content Types define content properties called _Fields_ (e.g. a blog post could have a single-line text input for title, and a rich text editor for body). See _Uniform Parameter/Field Types_ for the exact types of field that are allowed.

Uniform Content Type attributes:

- _name_
- _public ID_
- _fields_


### Uniform assets

Media files that are used in Uniform compositions and entries are called _Assets_ and are managed in the _Asset Library_. Mesh integrations can extend the Asset Library to allow for custom asset sources like external DAM systems or asset repositories (like Unsplash, Getty Images, etc).

#### Asset attributes

- _public id_ - the asset's unique identifier
- _type_ - the asset's type, such as 'image', 'video', 'audio', 'document', 'other'
- _source_ - such as 'uniform-assets' or an identifier specific to a Mesh integration
- _fields_ - the asset's metadata, such as the title, description, file, url, focal point coordinates, dimensions, etc

# Coding standards


- Always generate clean code and remove unused code, so the linter and typescript checks pass automatically. IMPORTANT: do not ever run build of the application as a part of the validation as this breaks developer server and is causing issues.

- Always use `pnpm` to install packages if you see `pnpm-lock.yaml` in the root folder, otherwise use `npm`. Never use `yarn`.

- You are a senior React engineer, follow best practices of React at all times.
- Use TailwindCSS best practices when building CSS. Don't re-invent the wheel.
- You are a senior engineer, do not try to impress me with over-delivery.
- Do not create more components than I ask you to. Keep things to the minimum required.

# Uniform practices

CRITICAL: When creating a new slot in Uniform, ensure that it is configured with allowAllComponents=true, inheritAllowedComponents=false and patternsInAllowedComponents=false.

CRITICAL: When pushing a component pattern, always allow overridability on each parameter by default.

CRITICAL: When registering components with Uniform and spotting repeated properties, always resort to modeling repeated set of properties as child components and create `<UniformSlot />` to render those. This will ensure reuse and avoid pollition with properties such as title1, description1, image1, title2, description2 and so on.

# Environment variables

1. Always add `UNIFORM_PREVIEW_SECRET=hello-world` into list of environment variables when setting up Uniform SDK.

## Uniform SDK

1. CRITICAL! When asked to add Uniform to the project, make sure to add all the required steps including changing code, not just the npm packages.

2. CRITICAL: never use uniform:push to push components, component patterns or any definitions to the Uniform project for me. Instead, rely on the Uniform MCP tool to take care of that.

3. CRITICAL: when handling component registration with Uniform, handle all other aspects of adapting a component to Uniform - change prop types to use Uniform parameter types for links and assets/images, using `UniformText` and `UniformRichText` components to render text and rich text instead of rendering it raw.

# Next.js

1. When creating a catch all page handler with Uniform (`[[...path]].tsx`), always place it at the root. Check if there is a conflicting page route definition, like `index.tsx` and disable it by renaming it to `.off` extension to avoid conflict.

2. When adding Uniform SDK, check for any component in Uniform that exist that are a composition component. If so, automatically create a corresponding React component for it in the codebase, register it and define all the slots that exist on the component definition in Uniform project.
