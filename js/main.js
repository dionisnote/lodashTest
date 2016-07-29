(function(){

	function cityTable(CityData) {

		this.data = CityData;
		this.tableFullTemplate = document.getElementById('streetTableTmpl').innerHTML;
		this.tableShortTemplate = document.getElementById('streetTableShortTmpl').innerHTML;
		this.tableTemplate = this.tableFullTemplate;

		this.headsFullTemplate = document.getElementById('tableHeadTmpl').innerHTML;
		this.headsShortTemplate = document.getElementById('tableHeadShortTmpl').innerHTML;
		this.headsTemplate = this.headsFullTemplate;

		this.renderTableValues = renderTableValues;
		this.renderTableHeads = renderTableHeads;
		
		this.addStreet = addStreet;
		this.deleteStreet = deleteStreet;
		
		this.maximalHouses = maximalHouses;
		this.minimalHouses = minimalHouses;
		// this.deleteStreet = deleteStreet;


		this.showShortVersion = showShortVersion;
		this.showFullVersion = showFullVersion;

		function renderTableValues(){
			var tableTemplate = this.tableTemplate;
			var tableRender = _.template(tableTemplate);

			var tableHtml = tableRender( {items: this.data} );

			var tableElement = document.getElementById('streetTable');
			
			tableElement.innerHTML = tableHtml;
			return this;
		}

		function renderTableHeads(){
			var keysArr = _.keys(this.data[0]);
			var headsTemplate = this.headsTemplate;
			var headsRender = _.template(headsTemplate);

			var headsHtml = headsRender({names:keysArr});
			
			var headsElement = document.getElementById('tableHeads');
			headsElement.innerHTML = headsHtml;
			return this;

		}

		function addStreet() {
			var nameInput = document.getElementById('cityName');
			var streetInput = document.getElementById('cityStreet');
			var countInput = document.getElementById('cityCount');
			var lastDataElement = this.data[this.data.length - 1];
			var idVal = parseInt(lastDataElement.id) + 1;

			var resObj = {
				id: idVal,
				city: nameInput.value,
				street: streetInput.value,
				countOfHouses: countInput.value
			}

			if( resObj.city && resObj.street ) {
				this.data.push( resObj );
				this.renderTableValues();
			}

		}

		function deleteStreet( id ) {
			console.log( id );
			var ev = _.remove( this.data, function(dt){
				return parseInt(dt.id) === parseInt(id);
			} );

			this.renderTableValues();
			this.renderTableHeads();
		}

		function maximalHouses() {
			var dt  = this.data;
			var maxSort = _.orderBy( dt, ['countOfHouses'], ['desc'])
			console.log(maxSort[0]);
			var tmpData = this.data;
			
			this.data = [];
			this.data.push(maxSort[0]);
			this.renderTableValues();
			this.renderTableHeads();
			this.data = tmpData;

		}

		function minimalHouses() {
			var dt  = this.data;
			var minSort = _.orderBy( dt, ['countOfHouses'], ['asc'])
			console.log(minSort[0]);
		var tmpData = this.data;
			this.data = [];
			this.data.push(minSort[0]);
			this.renderTableValues();
			this.renderTableHeads();
			this.data = tmpData;
		}

		function showShortVersion() {
			this.tableTemplate = this.tableShortTemplate;
			this.headsTemplate = this.headsShortTemplate;

			this.renderTableValues();
			this.renderTableHeads();
		}

		function showFullVersion() {
			this.tableTemplate = this.tableFullTemplate;
			this.headsTemplate = this.headsFullTemplate;

			this.renderTableValues();
			this.renderTableHeads();
		}


	}

var tbl = new cityTable(Streets);

tbl.renderTableHeads().renderTableValues();


var addBtn = document.getElementById('add');
addBtn.addEventListener('click', function(){
	tbl.addStreet();
});

var shortBtn = document.getElementById('shortView');
shortBtn.addEventListener('click', function(){
	tbl.showShortVersion();
});

var fullBtn = document.getElementById('fullView');
fullBtn.addEventListener('click', function(){
	tbl.showFullVersion();
});

var tblBody = document.getElementById('streetTable');

tblBody.addEventListener('click', function(e){
	var targetEl = e.target;
	var targetClass = targetEl.className;

	if( targetClass.indexOf('DelEl') > -1 ){
		var cityId = targetEl.getAttribute('data-city-id');

		tbl.deleteStreet(cityId);
	}
})



var maximalBtn = document.getElementById('maximal');

maximalBtn.addEventListener( 'click', function(){
	tbl.maximalHouses();
} );


var minimalBtn = document.getElementById('minimal');

minimalBtn.addEventListener( 'click', function(){
	tbl.minimalHouses();
} );

}())