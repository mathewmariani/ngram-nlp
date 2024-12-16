Vue.filter('exponential', function(value) {
	return value.toExponential(2)
})