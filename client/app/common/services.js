'use strict';

/* Services */


// titleService

angular.module('appServices', [])

    .factory('titleService', function ($document) {
        var suffix = '';
        var title = 'Untitled';
        return {
            setSuffix: function (s) {
                suffix = s;
                return suffix;
            },
            getSuffix: function () {
                return suffix;
            },
            setTitle: function (t) {
                if (suffix !== '') {
                    title = t + suffix;
                } else {
                    title = t;
                }
                return $document.prop('title', title);
            },
            getTitle: function () {
                return $document.prop('title');
            }
        };
    });
