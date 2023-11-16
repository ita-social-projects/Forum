
# General code conventions (suggestion)

> There are only two hard problems in Computer Science: cache invalidation and naming things — Phil Karlton


## Backend side (Django/Python)
# Project Code Conventions

_"The code is read much more often than it is written." -- Guido van Rossum._

The guidelines provided here are intended to improve the readability of project code to make the project support more effective and make project code consistent across the wide spectrum of Python codes.

## 1. Code Lay-out

### 1.1 Indentation

Use **4 spaces** per indentation level.

Continuation lines should align wrapped elements either vertically using Python's implicit line joining inside parentheses, brackets and braces.

```
# Aligned with opening delimiter.
foo = long_function_name(var_one, var_two,
                         var_three, var_four)
```

```
# Add 4 spaces (an extra level of indentation) to distinguish arguments from the rest.
def long_function_name(
        var_one, var_two, var_three,
        var_four):
    print(var_one)
```

The closing brace/bracket/parenthesis on multiline constructs may be lined up under the first character of the line that starts the multiline construct.

```
my_list = [
    1, 2, 3,
    4, 5, 6,
]
```

```
result = some_function_that_takes_arguments(
    'a', 'b', 'c',
    'd', 'e', 'f',
)
```

### 1.2 Maximum Line Length

Limit all lines to a **maximum of 120 characters**.

The preferred way of wrapping long lines is by using Python's implied line continuation inside parentheses, brackets, and braces. Long lines can be broken over multiple lines by wrapping expressions in parentheses. These should be used in preference to using a backslash for line continuation.

### 1.3 Blank Lines

Surround top-level function and class definitions with **two blank lines**.
```
...


def func_1(a, b):
    return a ** b + a ** 2 + b ** 2


def func_2(a, b, c):
    return (a + b + c) ** 3


...
```

Method definitions inside a class are surrounded by **a single blank line**.
```
...


class MyClass:
    def __init__(self):
        pass
    
    def __str__(self):
        pass


new_object = MyClass()
...
```
Use blank lines in functions, sparingly, to indicate logical sections.
```
def func(a, b):
    res = 0
    
    for i in range(10):
        res += a + b
    
    return res
```

### 1.4 File Encoding

Use **only UTF-8** as the primary encoding declaration for all Python code files.

### 1.5 Imports

Imports are always put at the top of the file, just after any module comments and docstrings, and before module globals and constants.

Imports should usually be **on separate lines**.
```
import os
import sys
```
However, several imports of different names from one module should be placed in one line:
```
from math import sqrt, pow, trunc
```
Imports should be grouped in the following order:
1. Standard library imports.
2. Related third party imports.
3. Local application/library specific imports.

Each group of imports should be separated from othar groups by a blank line.


## 2. String Quotes

Use **single-quoted** strings.
```
s = 'abc'
```

## 3. Whitespaces

Avoid extraneous whitespace in the following situations:

Immediately inside parentheses, brackets or braces: 
```
# Correct:
spam(ham[1], {eggs: 2})
```
```
# Wrong:
spam( ham[ 1 ], { eggs: 2 } )
```

Between a trailing comma and a following close parenthesis:
```
# Correct:
foo = (0,)
```
```
# Wrong:
bar = (0, )
```

Immediately before a comma, semicolon, or colon:
```
# Correct:
if x == 4: print x, y; x, y = y, x
```
```
# Wrong:
if x == 4 : print x , y ; x , y = y , x
```

However, in a slice the colon acts like a binary operator, and should have equal amounts on either side (treating it as the operator with the lowest priority). In an extended slice, both colons must have the same amount of spacing applied. Exception: when a slice parameter is omitted, the space is omitted:
```
# Correct:
ham[1:9], ham[1:9:3], ham[:9:3], ham[1::3], ham[1:9:]
ham[lower:upper], ham[lower:upper:], ham[lower::step]
ham[lower+offset : upper+offset]
ham[: upper_fn(x) : step_fn(x)], ham[:: step_fn(x)]
ham[lower + offset : upper + offset]
```
```
# Wrong:
ham[lower + offset:upper + offset]
ham[1: 9], ham[1 :9], ham[1:9 :3]
ham[lower : : upper]
ham[ : upper]
```

Immediately before the open parenthesis that starts the argument list of a function call:
```
# Correct:
spam(1)
```
```
# Wrong:
spam (1)
```

Immediately before the open parenthesis that starts an indexing or slicing:
```
# Correct:
dct['key'] = lst[index]
```
```
# Wrong:
dct ['key'] = lst [index]
```

More than one space around an assignment (or other) operator to align it with another:
```
# Correct:
x = 1
y = 2
long_variable = 3
```
```
# Wrong:
x             = 1
y             = 2
long_variable = 3
```

Avoid trailing whitespace anywhere. Because it's usually invisible, it can be confusing: e.g. a backslash followed by a space and a newline does not count as a line continuation marker. Some editors don't preserve it and many projects (like CPython itself) have pre-commit hooks that reject it.

Always surround these binary operators with a single space on either side: assignment (=), augmented assignment (+=, -= etc.), comparisons (==, <, >, !=, <>, <=, >=, in, not in, is, is not), Booleans (and, or, not).

If operators with different priorities are used, consider adding whitespace around the operators with the lowest priority(ies). Use your own judgment; however, never use more than one space, and always have the same amount of whitespace on both sides of a binary operator:
```
# Correct:
i = i + 1
submitted += 1
x = x*2 - 1
hypot2 = x*x + y*y
c = (a+b) * (a-b)
```
```
# Wrong:
i=i+1
submitted +=1
x = x * 2 - 1
hypot2 = x * x + y * y
c = (a + b) * (a - b)
```

Function annotations should use the normal rules for colons and always have spaces around the -> arrow if present. 
```
# Correct:
def munge(input: AnyStr): ...
def munge() -> PosInt: ...
```
```
# Wrong:
def munge(input:AnyStr): ...
def munge()->PosInt: ...
```

Don't use spaces around the = sign when used to indicate a keyword argument, or when used to indicate a default value for an unannotated function parameter:
```
# Correct:
def complex(real, imag=0.0):
    return magic(r=real, i=imag)
```
```
# Wrong:
def complex(real, imag = 0.0):
    return magic(r = real, i = imag)
```

When combining an argument annotation with a default value, however, do use spaces around the = sign:
```
# Correct:
def munge(sep: AnyStr = None): ...
def munge(input: AnyStr, sep: AnyStr = None, limit=1000): ...
```
```
# Wrong:
def munge(input: AnyStr=None): ...
def munge(input: AnyStr, limit = 1000): ...
```

Don't use compound statements (multiple statements on the same line):
```
# Correct:
if foo == 'blah':
    do_blah_thing()
do_one()
do_two()
do_three()
```
```
# Wrong:
if foo == 'blah': do_blah_thing()
do_one(); do_two(); do_three()
```

Don't put an if/for/while on the same line with multi-clause statements. 
```
# Wrong:
if foo == 'blah': do_blah_thing()
for x in lst: total += x
while t < 10: t = delay()

if foo == 'blah': do_blah_thing()
else: do_non_blah_thing()

try: something()
finally: cleanup()

do_one(); do_two(); do_three(long, argument,
                             list, like, this)

if foo == 'blah': one(); two(); three()
```

## 4. Comments

Comments that contradict the code are worse than no comments. Always make a priority of keeping the comments up-to-date when the code changes!

Comments should be complete sentences. The first word should be capitalized, unless it is an identifier that begins with a lower case letter (never alter the case of identifiers!).

Block comments generally consist of one or more paragraphs built out of complete sentences, with each sentence ending in a period.

You should use two spaces after a sentence-ending period in multi- sentence comments, except after the final sentence.

Ensure that your comments are clear and easily understandable to other speakers of the language you are writing in.

Python coders from non-English speaking countries: please write your comments in English, unless you are 120% sure that the code will never be read by people who don't speak your language.

### 4.1 Block Comments

Block comments generally apply to some (or all) code that follows them, and are indented to the same level as that code. Each line of a block comment starts with a # and a single space (unless it is indented text inside the comment).


### 4.2 Inline Comments

Don't use inline comments at all.


### 4.3 Documentation Strings

Use triple double-quotes for all docstrings. The ends a multiline docstring should be on a line by itself:
```
"""Return a foobang

Optional plotz says to frobnicate the bizbaz first.
"""
```

For one liner docstrings, please keep the closing """ on the same line:
```
"""Return an ex-parrot."""
```

Write docstrings for all public: 
- modules, 
- functions, 
- classes, 
- methods. 

```
"""Module docstring"""
...
```
```
def func(a, b):
    """func docstring"""
    pass
```
```
class MyClass:
    """MyClass docstring"""

    def __init__(self):
        """MyClass.__init__ docstring"""
        pass

    def __str__(self):
        """MyClass.__str__ docstring"""
        pass

    ...
```



## 5. Naming Conventions

Names that are visible to the user as public parts of the API should follow conventions that reflect usage rather than implementation.

### 5.1 Naming Styles

Use the following kinds of naming styles:
- b (single lowercase letter);
- B (single uppercase letter);
- lowercase;
- lower_case_with_underscores;
- UPPERCASE;
- UPPER_CASE_WITH_UNDERSCORES;
- CapitalizedWords (or CapWords, or CamelCase, or StudlyCaps);
- _single_leading_underscore: weak "internal use" indicator;
- single_trailing_underscore_: used by convention to avoid conflicts with Python keyword;
- __double_leading_underscore: when naming a class attribute, invokes name mangling;
- \__double_leading_and_trailing_underscore__: "magic" objects or attributes that live in user-controlled namespaces.


### 5.2 Naming Conventions

#### 5.2.1 Names to Avoid

Never use the characters:
- 'l' (lowercase letter el), 
- 'O' (uppercase letter oh), 
- 'I' (uppercase letter eye) 

as single character variable names.

In some fonts, these characters are indistinguishable from the numerals one and zero. When tempted to use 'l', use 'L' instead.


#### 5.2.2 Package and Module Names

Modules should have short, all-lowercase names. Underscores can be used in the module name if it improves readability. 

Python packages should also have short, all-lowercase names, although the use of underscores is discouraged.

#### 5.2.3 Class Names

Class names should use the CamelCase convention.

The naming convention for functions may be used instead in cases where the interface is documented and used primarily as a callable.

#### 5.2.4 Type Variable Names

Names of type variables should normally use CamelCase preferring short names: T, AnyStr, Num. It is recommended to add suffixes _co or _contra to the variables used to declare covariant or contravariant behavior correspondingly:
```
from typing import TypeVar

VT_co = TypeVar('VT_co', covariant=True)
KT_contra = TypeVar('KT_contra', contravariant=True)
```

#### 5.2.5 Exception Names

Exception names should use the CamelCase convention.

Use suffix "Error" for your custom exceptions (if the exception actually is an error).


#### 5.2.6 Function and Variable Names

Function names should be lowercase, with words separated by underscores (SnakeCase) as necessary to improve readability.

All function names should be written in the form _[doing]\_[what]_, where _[doing]_ is a verb, which specifies the action which the function performs, while _[what]_ is a noun, which defines the action object.
```
def compute_sum(*args):
    n_sum = 0
    
    for a in args:
        n_sum += a

    return n_sum
```


Variable names follow the same convention as function names.


#### 5.2.7 Function and Method Arguments

Use type hinting for function arguments.
Always use **self** for the first argument to instance methods.

Always use **cls** for the first argument to class methods.

If a function argument's name clashes with a reserved keyword, it is generally better to append a single trailing underscore rather than use an abbreviation or spelling corruption. Thus _class__ is better than _clss_. (Perhaps better is to avoid such clashes by using a synonym.)


#### 5.2.8 Method Names and Instance Variables

Use the function naming rules: lowercase with words separated by underscores (SnakeCase) as necessary to improve readability.

Use one leading underscore only for non-public methods and instance variables.

To avoid name clashes with subclasses, use two leading underscores to invoke Python's name mangling rules.

#### 5.2.9 Constants

Define constants on a module level and write them using capital letters with underscores separating words:
```
MAX_OVERFLOW = 10000
TOTAL = 2000000
``` 

#### 5.2.10 Designing for Inheritance

Always decide whether a class's methods and instance variables (collectively: "attributes") should be public or non-public. If in doubt, choose non-public; it's easier to make it public later than to make a public attribute non-public.

Public attributes are those that you expect unrelated clients of your class to use, with your commitment to avoid backwards incompatible changes. Non-public attributes are those that are not intended to be used by third parties; you make no guarantees that non-public attributes won't change or even be removed.

Use the following guidelines:
- Public attributes should have no leading underscores.
- If your public attribute name collides with a reserved keyword, append a single trailing underscore to your attribute name. 
- For simple public data attributes, it is best to expose just the attribute name, without complicated accessor/mutator methods. 
- Avoid using properties for computationally expensive operations; the attribute notation makes the caller believe that access is (relatively) cheap.
- If your class is intended to be subclassed, and you have attributes that you do not want subclasses to use, consider naming them with double leading underscores and no trailing underscores. 


## References

1. [PEP 8 - Style Guide for Python Code](https://www.python.org/dev/peps/pep-0008/)
2. [Pylint - code analysis for Python](https://www.pylint.org/)
3. [PyCharm 2020.3 Code Style. Python](https://www.jetbrains.com/help/pycharm/code-style-python.html)
4. [PyCharm 2020.3 External tools. Pylint](https://www.jetbrains.com/help/pycharm/configuring-third-party-tools.html)
5. [Editing Python in Visual Studio Code](https://code.visualstudio.com/docs/python/editing)
6. [Linting Python in Visual Studio Code](https://code.visualstudio.com/docs/python/linting)


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

