$(document).ready(function () {
    function apiSearch() {
        var params = {
            'q': $('#query').val(),
            'count': 50,
            'offset': 0,
            'mkt': 'en-us'
        };

        $.ajax({
            url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
            type: 'GET',
            headers: {
                'Ocp-Apim-Subscription-Key': '934e55f6420941eab67c13be3b907847'
            }
        })
            .done(function (data) {
                var len = data.webPages.value.length;
                var results = '';
                for (var i = 0; i < len; i++) {
                    results += `<p><a href="${data.webPages.value[i].url}" target="_blank">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
                }

                $('#searchResults').html(results).addClass('expanded');
            })
            .fail(function () {
                alert('error');
            });
    }

    $('#searchButton').click(function () {
        apiSearch();
    });

    $('#searchEngineName').click(function () {
        $('body').css('background-image', 'url("/floral.jpg")');
    });

    $('#timeButton').click(function () {
        var currentTime = new Date();
        var formattedTime = currentTime.getHours().toString().padStart(2, '0') + ':' + currentTime.getMinutes().toString().padStart(2, '0');
        $('#time').text(formattedTime);
        $('#time').css('visibility', 'visible'); // Ensure the div is visible
        $('#time').dialog({
            title: "Current Time", // Add a title to the dialog
            open: function () {
                $(this).parent().find('.ui-dialog-titlebar-close').hide(); // Hide the close button
            }
        });
    });
});
