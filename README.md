# README

A Simple Slider.

[Demo](http://justclear.github.io/sliderify)

## Getting Started With Sliderify

### Import CSS and JavaScript file.

```
<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="stylesheet" href="./dist/css/sliderify.min.css">
</head>
<body>
    <script src="./libs/jquery/dist/jquery.js"></script>
    <script src="./dist/js/sliderify.min.js"></script>
</body>
</html>   
```

### Add sliderify HTML Layout.

```
<!-- Sliderify main container -->
<div class="sliderify-container">

	<!-- Additional required wrapper -->
	<div class="sliderify-wrapper">
		<div class="sliderify-slide">Slide 1</div>
		<div class="sliderify-slide">Slide 2</div>
		<div class="sliderify-slide">Slide 3</div>
		<div class="sliderify-slide">Slide 4</div>
		<div class="sliderify-slide">Slide 5</div>
	</div>

	<!-- pagination buttons -->
	<div class="sliderify-prev">Prev</div>
	<div class="sliderify-next">Next</div>
	
	<!-- pagination -->
	<div class="sliderify-pagination"></div>
</div>
```

### Options

```
$('.sliderify-wrapper').sliderify({
	// Initial slide.
	initialSlide: 0, 
	
	// Whether to auto play.
	autoPlay: true, 
	
	// Auto play interval.
	autoPlayInterval: 3000, 
	
	// Whether to hide the pagination.
	hidePagination: false, 
	
	// Whether to hide the pagination buttons.
	hidePaginationButtons: false, 
	
	// Whether use keyboard to control.
	keyboardControl: true 
});
```

### Todos

- Touch support.
