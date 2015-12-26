# README

A Simple Slider.

[Demo](http://justclear.github.io/sliderify)

## Features

### New Features V1.1.1

- Draggable.

### New Features V1.1.0

- Restructure the whole plugin - makes the code easier to read.
- Fixed animation delay bug.

### Features V1.0.0

- Responsive design.
- Keyboard control.
- Automatic play.

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

	// On hover to stop automaic play.
	onHoverStopAutoPlay: true,

	// Sliding interval.
	slidingInterval: 500,
	
	// Whether to hide the pagination.
	hidePagination: false,
	
	// Whether to hide the pagination buttons.
	hidePaginationButtons: false,

	// Pagination buttons text,
	// If you want to use text pagination,
	// You can use array `['Prev', 'Next']`,
	// Otherwise you can use string `'arrow'`.
	paginationButtonsText: 'arrow', 
	
	// Whether use keyboard to control.
	keyboardControl: true

	// Whether to support drag.
	isDraggable: true
});
```

### Todos

- Touch support.
- Draggable support. - Done
- Loop slide.
- On hover stop automatic play. - Done
- Mousewheel control