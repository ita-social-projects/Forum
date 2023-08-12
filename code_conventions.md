
# Genaral code conventions (suggestion)

> There are only two hard problems in Computer Science: cache invalidation and naming things — Phil Karlton


## Backend side (Django/Python)
> coming soon

## Frontend side (React/JS/CSS)
- [Structure of the src folder](#structure-of-the-src-folder)
- [React code convention](#react-code-convention)
- [Styles naming](#css-code-convetion-rules) 

### Structure of the src folder (as for now)

- General rule:
```
src/
    components/
        blockName/
            blockNamePart/
                blockNamePart.jsx
                blockNamePart.module.css
                blockNamePart.test.js
                blockNamePartAPI.js
        UI/
            header/
            footer/
            modal/
            checkbox/
            input/
            button/

    pages
        pageName.jsx

    assets
```

[Example](#https://profy.dev/article/react-folder-structure)

### React code convention

- [Naming convention](#react-naming-convention)
- [Import order](#react-import-order)
- [General rules](#react-general-rules)
- [Resources](#react-resources)

#### React naming convention

- Components
>    - main component of the file should be name as: FileNameComponent
>    - main component should be declared as*

```
function SomeNameComponent(props) {}

export default SomeNameComponent;
```

>    - additional components:


```
const AdditionalComponent = (props) => {}
```

- Data
    - boolean: should contain a prefix like `is`, `has`, `canBe` etc
    - array: should be plural

- Events
    - use prefix `handle` for functions to be passed to handle events: `handleChange`, `handleSubmit`
    - use built-in event name if possible: `onClick`, `onChange`
    - use present tense: `onChange` not `onChanged`


> *Better not to use default (?)

#### React Import order

```
{
  'import/order': [
    2,
    {
      'newlines-between': 'always',
      groups: [
        'builtin',
        'external',
        'internal',
        'parent',
        'sibling',
        'index',
        'unknown',
        'object',
        'type',
      ],
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
      pathGroups: [
        {
          pattern: 'react*',
          group: 'external',
          position: 'before',
        },
      ],
    },
  ],
}
```
1. Group your imports (suggested grouping is above);
2. Always add a newline between groups;
3. Organize each group in alphabetic order;
4. Add a newline between a block of import and your code;


#### React general rules

1. Use PascalCase in components, interfaces, or type aliases;
2. Use camelCase for JavaScript data types like variables, arrays, objects, functions, etc.;
3. Use camelCase for folder and non-component file names and PascalCase for component file names;
4. Separate function from the JSX if it takes more than 1 line;
5. Avoid using indexes as key props;
6. Prefer destructuring properties;
7. Avoid huge components;
8. Group the state whenever possible;
9. Avoid curly braces for string props;
10. Avoid using inline styles;
11. Prefer conditional rendering with ternary operator;
12. Use constants or enums for string values;
13. Use descriptive variable names;
14. Avoid long list of function arguments;
15. Use object destructuring;
16. Prefer using template literals;
17. Use implicit return in small functions.


#### React resources

1. [Component naming](#https://medium.com/@smail.oubaalla/how-to-name-your-react-component-conventions-b8daf3abc574)
2. [Best practices for naming hooks & props in React](#https://spencerpauly.com/tech/react-naming-conventions-best-practices/)
3. [React code conventions and best practices](#https://levelup.gitconnected.com/react-code-conventions-and-best-practices-433e23ed69aa)
4. [React documentation](#https://react.dev)
5. [JS naming conventions](#https://www.makeuseof.com/javascript-naming-conventions/)


### CSS code convetion rules

- [BEM convention for class naming](#bem-convention)
    - [naming rules](#bem-naming-rules)
    - [example](#bem-example)
    - [resources and examples](#bem-resources)
- [Naming files inside the project](#naming-css-files-in-the-project)
- [General CSS convention rules](#css-general-rules)
    - [examples](#css-general-rules-examples)


#### BEM convention

There is a popular convention called BEM (Block-Element-Modifier).

- **Block**: encapsulates a standalone entity that is meaningful on its own.
- **Element**: parts of a block that have no standalone meaning.
- **Modifier**: flags on blocks or elements.

##### BEM Naming rules

- names are written in lowercase Latin letters;
- words are separated by a hyphen (-);
- the block name defines the namespace for its elements and modifiers;
- the element name is separated from block name by a double underscore (__);
- the modifier is separated from the block or element by a double hyphen (--);
- boolean modifiers are separated from the name of the block or element by a double hyphen (--);
- the value of modifier is separated from its name by a double hyphen (--).

##### BEM Example:

 General: 

    `block__element--modifier--modifier-value`

 We have a sign up form with consists of blocks of label and input. Some of the fields are required. 

```
    1 .form {...} // entity 
    2 .form__label {...} 
    3 .form__field {...}
    4 .form__label--required {...}
    5 .form__field--invalid {...}
```
First line refers to the whole block of the form (usually `<form>` or outer `<div>` tag).

Second and third lines refer to the parts of the form such as label and field (input part).

Lines 4-5 refers to variations of existing parts, such as change color of the text of the previously defined label or field. 

##### BEM resources

1. [Simple explanatory example](#https://www.freecodecamp.org/news/css-naming-conventions-that-will-save-you-hours-of-debugging-35cea737d849/)
2. [Beautiful more complex example](#https://www.scaler.com/topics/css-class-naming-convention/)
3. [BEM Methodology Documentation](#https://en.bem.info/methodology/naming-convention/)

#### Naming CSS files in the project

- use `ComponentName.module.css` pattern;


#### CSS general rules

- use longhand rules over shorthand;
- use double quotes around values;
- use CSS-style comments to add more clarity;
- don't use preprocessors (unless specified);

> ? use flexible/relative units (like rem or percentage instead of px)

> to be continued

##### CSS general rules examples
- *lognhand rule*: 
```
    font-variant: small-caps;
    font-weight: bold;
    font-size: 2rem;
    line-height: 1.5;
    font-family: sans-serif;
```
- *shorthand rule*:  
```
    font: small-caps bold 2rem/1.5 sans-serif;
```
- double quotes around values:
```
    font-family: "Something Pretty";
```

