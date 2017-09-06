**zGallery** is a popup slider gallery plugin, simple analogue of Fancybox/Lightbox. 

# Installation

### Step 1: Link required files:
```html
<!-- zGallery styles -->
<link href="css/jquery.zgallery.css" rel="stylesheet" type="text/css" />
<!-- jQuery library -->
<script src="js/jquery.min.js"></script>
<!-- TouchSwipe plugin to handle swipe events -->
<script src="js/jquery.touchSwipe.min.js"></script>
<!-- zGallery script -->
<script src="js/jquery.zgallery.js"></script>
```
### Step 2: Create HTML markup:

The list of preview images/elements, each having two obligatory attributes:  
1) 'data-zgallery' attribute - the sign that this element is to initiate the gallery. To combine several elements in a gallery, give them the same value of this attribute
2) 'data-src' attribute containing the link to the source element for popup content
```html
<ul class="thumbs clearfix">
    <li>
        <a data-zgallery="gallery1" data-src="#popup-1" href="javascript:;">
            <img src="img/thumbs/qna-1.jpg" />
        </a>
    </li>
    <li>
        <a data-zgallery="gallery1" data-src="#popup-2" href="javascript:;">
            <img src="img/thumbs/qna-2.jpg" />
        </a>
    </li>
    ...
    <li>
        <a data-zgallery="gallery1" data-src="#popup-8" href="javascript:;">
            <img src="img/thumbs/qna-8.jpg" />
        </a>
    </li>
</ul>
```


The list of sources elements for popups content, each having obligatory id attribute:

```html
<ul class="popups">
    <li id="popup-1">
        <img src="img/popups/popup-pic1.jpg" />
    </li>
    <li id="popup-2">
        <img src="img/popups/popup-pic2.jpg" />
    </li>
    ...
    <li id="popup-8">
        <img src="img/popups/popup-pic8.jpg" />
    </li>
</ul>
```


### Step 3: Call the plugin: 
```javascript
$('body').zGallery();
```
