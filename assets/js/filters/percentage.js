Vue.filter('percentage', function(value) {
	return value.toFixed(2) + "%"
});