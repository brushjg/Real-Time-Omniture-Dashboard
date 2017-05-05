$( document ).ready(function() {  
    function updateDashboards(){
        MarketingCloud.makeRequest(config.username, config.secret, 'Report.Run', {
        "reportDescription":{
            "source": "realtime",
            "reportSuiteID":config.reportSuiteID,
            "metrics": [
                { "id": "instances" }
            ], "elements": [
                { "id": "page", "selected": ["Member Center | BGC Registration | Fullpage Paywall Challenge"] }
            ],
            "dateGranularity" : "minute:1",
            "dateFrom": "-10 minutes"
        }
        }, config.endpoint, function(response) {
            var paywallData = jQuery.parseJSON(JSON.stringify(response.responseJSON));
            var arrayOfData = paywallData.report.data;
            var formatOutput = '';
            var colorArray = [];
            for (var i=0;i<arrayOfData.length;i++) {
                colorArray[i] = arrayOfData[i].breakdownTotal[0];
            }
            colorArray.sort();

            for (var i=(arrayOfData.length-1);i>=0;i--) {
                console.log ('loopin on this minute'+arrayOfData[i].minute);
                if (arrayOfData[i].breakdownTotal[0] == colorArray[0]) {
                    colorClass='color-scale1';
                } else if (arrayOfData[i].breakdownTotal[0] == colorArray[1]) {
                     colorClass='color-scale2';
                } else if (arrayOfData[i].breakdownTotal[0] == colorArray[2]) {
                     colorClass='color-scale3';
                } else if (arrayOfData[i].breakdownTotal[0] == colorArray[7]) {
                     colorClass='color-scale4';
                } else if (arrayOfData[i].breakdownTotal[0] == colorArray[8]) {
                     colorClass='color-scale5';
                } else if (arrayOfData[i].breakdownTotal[0] == colorArray[9]) {
                     colorClass='color-scale6';
                } else {
                    colorClass = '';
                }
                formatOutput += '<div class="'+colorClass+'" >Date '+arrayOfData[i].month+'/'+arrayOfData[i].day+' Time '+arrayOfData[i].hour +':' + arrayOfData[i].minute+  ' Users: '+arrayOfData[i].breakdownTotal[0] + '   </div>'
            }
            $('.paywall__reports').html(formatOutput);
        });
        //------- second querry
            MarketingCloud.makeRequest(config.username, config.secret, 'Report.Run', {
        "reportDescription":{
            "source": "realtime",
            "reportSuiteID":"nytbostonglobecom",
            "metrics": [
                { "id": "instances" }
            ], "elements": [
                { "id": "page", "selected": ["Member Center | BGC Registration | Log In"] }
            ],
            "dateGranularity" : "minute:1",
            "dateFrom": "-10 minutes"
        }
        }, config.endpoint, function(response) {
            var paywallData = jQuery.parseJSON(JSON.stringify(response.responseJSON));
            var arrayOfData = paywallData.report.data;
            var formatOutput = '';
            var colorArray = [];
            for (var i=0;i<arrayOfData.length;i++) {
                colorArray[i] = arrayOfData[i].breakdownTotal[0];
            }
            colorArray.sort();

            for (var i=(arrayOfData.length-1);i>=0;i--) {
                console.log ('loopin');
                if (arrayOfData[i].breakdownTotal[0] == colorArray[0]) {
                    colorClass='color-scale1';
                } else if (arrayOfData[i].breakdownTotal[0] == colorArray[1]) {
                     colorClass='color-scale2';
                } else if (arrayOfData[i].breakdownTotal[0] == colorArray[2]) {
                     colorClass='color-scale3';
                } else if (arrayOfData[i].breakdownTotal[0] == colorArray[7]) {
                     colorClass='color-scale4';
                } else if (arrayOfData[i].breakdownTotal[0] == colorArray[8]) {
                     colorClass='color-scale5';
                } else if (arrayOfData[i].breakdownTotal[0] == colorArray[9]) {
                     colorClass='color-scale6';
                } else {
                    colorClass = '';
                }
                formatOutput += '<div class="'+colorClass+'" >Date '+arrayOfData[i].month+'/'+arrayOfData[i].day+' Time '+arrayOfData[i].hour +':' + arrayOfData[i].minute+  ' Users: '+arrayOfData[i].breakdownTotal[0] + '   </div>'
            }
            $('.membercenter__reports').html(formatOutput);
        }); 
    }
setInterval(updateDashboards,100000);
updateDashboards();
});