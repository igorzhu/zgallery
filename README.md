# How to install

### Step 1: Link required files:
```
<link href="css/jquery.zgallery.css" rel="stylesheet" type="text/css" />
<script src="js/jquery.min.js"></script>
<script src="js/jquery.touchSwipe.min.js"></script>
<script src="js/jquery.zgallery.js"></script>
```
### Step 2: Create HTML markup:

The list of preview images/elements, each having 
1) 'data-zgallery' attribute - the sign that this element is to initiate the gallery. To combine several elements in a gallery, give them the same value of this attribute
2) 'data-src' attribute containing the link to the source element for popup content
```
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
    <li>
        <a data-zgallery="gallery1" data-src="#popup-3" href="javascript:;">
            <img src="img/thumbs/qna-3.jpg" />
        </a>
    </li>
    <li>
        <a data-zgallery="gallery1" data-src="#popup-4" href="javascript:;">
            <img src="img/thumbs/qna-4.jpg" />
        </a>
    </li>
    <li>
        <a data-zgallery="gallery1" data-src="#popup-5" href="javascript:;">
            <img src="img/thumbs/qna-5.jpg" />
        </a>
    </li>
    <li>
        <a data-zgallery="gallery1" data-src="#popup-6" href="javascript:;">
            <img src="img/thumbs/qna-6.jpg" />
        </a>
    </li>
    <li>
        <a data-zgallery="gallery1" data-src="#popup-7" href="javascript:;">
            <img src="img/thumbs/qna-7.jpg" />
        </a>
    </li>
    <li>
        <a data-zgallery="gallery1" data-src="#popup-8" href="javascript:;">
            <img src="img/thumbs/qna-8.jpg" />
        </a>
    </li>
</ul>
```



### Step 3: Call the plugin: 
```
$('body').zGallery();
```
