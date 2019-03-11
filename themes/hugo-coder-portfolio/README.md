---------------------------
This theme is created based on [hugo-coder](https://github.com/luizdepra/hugo-coder).  
I made it possible to tell yourself more by my change.   
Please see [FeaturesOfCoderPortfolio](https://github.com/naro143/hugo-coder-portfolio/blob/master/exampleSite/content/posts/FeaturesOfCoderPortfolio.md) in the post about the change.
Have questions or suggestions? Feel free to [open an issue on GitHub](https://github.com/naro143/hugo-coder-portfolio/issues/new) or [ask me on Twitter](https://twitter.com/naro143).

---------------------------

A simple and clean blog theme for Hugo.

![](https://github.com/naro143/hugo-coder-portfolio/blob/master/images/screenshot.png)

## How to use this theme

To use `hugo-coder-portfolio` go through the following steps.

### Download

Clone this repository into your Hugo project.

```
git clone https://github.com/naro143/hugo-coder-portfolio themes/coder-portfolio
```

### Configuration

Add the following lines to your `config.toml`.

```toml
baseurl = "http://www.example.com" # Hostname (and path) to the root.
title = "Yusuke Ishimi" # Site title.
theme = "coder-portfolio" # Set the theme.
languagecode = "en" # The site’s language code used to generate RSS.
defaultcontentlanguage = "en" # The default content language.

paginate = 20 # Default number of pages per page in pagination.

pygmentsstyle = "b2" # Color-theme or style for syntax highlighting.
pygmentscodefences = true # Enable code fence background highlighting.
pygmentscodefencesguesssyntax = true # Enable syntax guessing for code fences without specified language.
pygmentsUseClasses = true # new add

disqusShortname = "yourdiscussshortname" # Enable or disable Disqus.

[params] # theme parameters
    author = "Yusuke Ishimi" # Author's name.
    info = "WEB AND APPS ENGINEER" # Author's job title or info.
    description = "Yusuke Ishimi's personal website" # Site description.
    keywords = "blog,developer,personal" # Site keywords.
    avatarurl = "images/avatar.jpg" # Contain the path of the optionnal avatar in the static folder.

    footercontent = "Enter a text here." # Add footer content
    fixedbarContent = "Do you want to know me more private?→" # Add fixedbar content
    fixedbarContentAfter = "Thank You! Please share it if you like it→" # Add fixedbar content after click

    # Whether you want to hide copyright and credits in the footer.
    hideCredits = false
    hideCopyright = false

    # Custom CSS
    custom_css = []

    # Alignment of Mobile Menu items
    itemscentered = true

    # RTL support
    rtl = false

    snsShare = true # new add

    thumbnail = "images/tn.png" # default sns thumbnail

    # Multilanguage mode
    langseparator = "|" # Separates menus from language selectors when site is multilingual.

# Social links
[[params.social]]
    name = "Github"
    weight = 1
    url = "https://github.com/naro143/"
[[params.social]]
    name = "Twitter"
    weight = 2
    url = "https://twitter.com/naro143/"
[[params.social]]
    name = "LinkedIn"
    weight = 3
    url = "https://www.linkedin.com/in/naro143/"

# Menu links
[[menu.main]]
    name = "Blog"
    weight = 1
    url  = "posts"
