// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


var active = false;

function updateIcon() {
  if (!active) {
    chrome.browserAction.setIcon({path:"icon_active.png"});
    updatePage(true);
    active = true;
  } else {
    chrome.browserAction.setIcon({path:"icon_desactive.png"});
    updatePage(false);
    active = false;
  }
}

function updatePage(shouldActivate) {
	if (shouldActivate) {
		chrome.tabs.executeScript(null, {
			code:readFile('activeinject.js')
		});
	} else {
		chrome.tabs.executeScript(null, {
			code:readFile('desactiveinject.js')
		});
	}
}

function readFile(path){
	var request = new XMLHttpRequest();
	request.open("GET", path, false);
	request.send(null);
	return request.responseText;
}

function onPageUpdate(){
  updatePage(active);
}

chrome.browserAction.onClicked.addListener(updateIcon);
chrome.tabs.onCreated.addListener(function(tab){onPageUpdate();});
chrome.tabs.onUpdated.addListener(function(id, info, tab){onPageUpdate();});
chrome.tabs.onActivated.addListener(function(info){onPageUpdate();});
