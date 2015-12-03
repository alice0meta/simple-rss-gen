#!/usr/bin/env node

var repo_root = process.argv[2]
var site_root = 'http://thirdfoundation.github.io/'

var fs = require('fs')
var _ = require('underscore')
var rss = require('rss')
var path = require('path')

var blgs = repo_root+'/json/blogposts'
var out = repo_root+'/rss.xml'

var feed = new rss({
	title:'Third Foundation',
	feed_url:'http://thirdfoundation.github.io/rss.xml',
	site_url:'http://thirdfoundation.github.io/',
	ttl:'60',
	})
fs.readdirSync(blgs).filter(function(ι){return /\.json$/.test(ι)}).map(function(slug){
	var ι = JSON.parse(fs.readFileSync(blgs+'/'+slug)+'')[0]
	var t = _(ι).pick('title','date','description')
	t.guid = t.url = site_root+'#/blog/'+path.basename(slug,'.json')
	t.date = t.date? Date(t.date)+'' : '1970-01-01T00:00:00Z' // only needed because bad data
	feed.item(t)
	})
fs.writeFileSync(repo_root+'/rss.xml', feed.xml({indent:'  '}))
