/* eslint-env node */
'use strict';

const path = require('path');
const Funnel = require('broccoli-funnel');
const MergeTrees = require('broccoli-merge-trees');
const map = require('broccoli-stew').map;
const replace = require('broccoli-string-replace');

module.exports = {
  name: 'ember-videojs-hls',

  included: function (app) {
    this._super.included.apply(this, arguments);

    app.import({
      development: path.join('vendor/videojs-contrib-hls.js'),
      production: path.join('vendor/videojs-contrib-hls.min.js')
    });

  },

  treeForVendor(vendorTree) {
    let trees = [];

    if (vendorTree) {
      trees.push(vendorTree);
    }

    //
    // HLS
    let lib = new Funnel(path.join(this.project.root, 'node_modules', 'videojs-contrib-hls', 'dist'));
    lib = map(lib, (content) => `if (typeof FastBoot === 'undefined') { ${content} }`);
    trees.push(lib);

    return new MergeTrees(trees);
  },
};
