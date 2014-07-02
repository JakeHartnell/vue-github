var Fetchable = require('../fetchable');

var siteBaseUrl = 'https://github.com/';
var repoBaseUrl = 'https://api.github.com/repos/';

module.exports = Fetchable.extend({
  template: require('./template.html'),
  paramAttributes: ['user', 'project', 'milestone', 'data-milestone'],
  computed: {
    apiUrl: function() {
      var url, number;
      if (this.user && this.project) {
        url = repoBaseUrl + this.user + '/' + this.project + '/issues?';
        if (this.milestone && this.milestone.number) {
          number = this.milestone.number;
        } else if (this['data-milestone']) {
          number = this['data-milestone'];
        } else {
          number = this.milestone;
        }
        if (!isNaN(number)) {
          url += 'milestone=' + number;
          if (this.milestone && this.milestone.state == 'closed') {
            url += '&state=all';
          }
        }
        if (this.labels) {
          url += '&labels=' + this.labels.join(',');
        }
        return url;
      }
    },
    htmlUrl: function() {
      if (this.user && this.project) {
        var url = siteBaseUrl + this.user + '/' + this.project + '/issues';
        return url;
      }
    }
  },
  created: function () {
    this.$watch('user', function () {
      this.fetchData();
    });
    this.$watch('project', function () {
      this.fetchData();
    });
    this.$watch('milestone', function () {
      this.fetchData();
    });
    this.$watch('labels', function () {
      this.fetchData();
    });
  },
  methods: {
    toggleActive: function(e) {
      if (e.targetVM.accordionOpen) {
        e.targetVM.accordionOpen = false;
      } else {
        e.targetVM.accordionOpen = true;
      }
    }
  }
});